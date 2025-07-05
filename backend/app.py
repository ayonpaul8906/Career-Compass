from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import google.generativeai as genai
from datetime import datetime, timedelta
from functools import wraps
import PyPDF2
import docx
from dotenv import load_dotenv
import os
import json
# import pytesseract
from PIL import Image

load_dotenv() 
# ---- CONFIG ----
firebase_json = os.getenv("FIREBASE_ADMIN_SDK_JSON")
if not firebase_json:
    raise ValueError("Missing FIREBASE_ADMIN_SDK_JSON environment variable")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ----------------

# Firebase
cred = credentials.Certificate(json.loads(firebase_json))
firebase_admin.initialize_app(cred)
db = firestore.client()

# Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

# Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# In-memory rate limiter store
user_request_log = {}

# Helper: rate limiter decorator
def rate_limiter(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        user_id = request.form.get('user_id') if request.content_type and request.content_type.startswith('multipart/form-data') else request.json.get('user_id')
        now = datetime.now()

        if user_id not in user_request_log:
            user_request_log[user_id] = []

        # Remove expired entries
        window_start = now - timedelta(seconds=60)
        user_request_log[user_id] = [t for t in user_request_log[user_id] if t > window_start]

        if len(user_request_log[user_id]) >= 5:
            return jsonify({'error': 'Rate limit exceeded. Please try again later.'}), 429

        user_request_log[user_id].append(now)
        return func(*args, **kwargs)
    return wrapper

# Helper: get conversation
def get_conversation(user_id):
    doc_ref = db.collection('conversations').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict().get('messages', [])
    return []

# Helper: save conversation
def save_conversation(user_id, messages):
    doc_ref = db.collection('conversations').document(user_id)
    doc_ref.set({'messages': messages})

# Helper: clear conversation
def clear_conversation(user_id):
    doc_ref = db.collection('conversations').document(user_id)
    doc_ref.delete()

# Helper: extract text from uploaded file
def extract_text_from_file(file):
    filename = file.filename.lower()
    if filename.endswith('.pdf'):
        reader = PyPDF2.PdfReader(file)
        return ' '.join(page.extract_text() or '' for page in reader.pages)
    elif filename.endswith('.docx'):
        doc_file = docx.Document(file)
        return '\n'.join([para.text for para in doc_file.paragraphs])
    # elif filename.endswith(('.png', '.jpg', '.jpeg')):
    #     image = Image.open(file)
    #     return pytesseract.image_to_string(image)
    else:
        return ''

@app.route('/chat', methods=['POST'])
@rate_limiter
def chat():
    # Handle file upload (multipart/form-data)
    if request.content_type and request.content_type.startswith('multipart/form-data'):
        user_id = request.form.get('user_id')
        user_message = request.form.get('message', '')
        file = request.files.get('file')
        file_text = ''
        if file:
            file_text = extract_text_from_file(file)
        if file_text:
            user_message = (user_message or '') + "\n\nResume Content:\n" + file_text
    else:
        data = request.get_json()
        user_id = data.get('user_id')
        user_message = data.get('message', '')

    if not user_id or not user_message:
        return jsonify({'error': 'user_id and message are required.'}), 400

    messages = get_conversation(user_id)
    messages.append({"role": "user", "content": user_message})

    # Build Gemini input
    prompt_text = """You are a professional AI Career Mentor designed to help school and college students make informed career choices.

Your ONLY purpose is to provide career guidance based on the user's academic stream, interests, strengths, skills, and goals. You help them choose suitable career paths, recommend courses, suggest skills to learn, and advise on future opportunities.

⚠️ You must strictly refuse to answer any questions unrelated to careers (such as jokes, general chit-chat, entertainment, personal gossip, or controversial topics). Politely reply: *"I'm here to help you with your career decisions only."*

✅ Guidelines for responses:
- If the user greets you with simple messages (e.g., "Hi", "Hello", "Hey", "How are you?"), you must respond with this exact line only: **"Hello! How can I help you with your career today?"** Never add anything else, no jokes, no multiple languages, no emojis, no creative text.
- For any career-related questions, provide detailed, informative, and motivational responses.
- Use markdown-like style to make replies visually engaging:
    - Use **bold** for important keywords or career paths.
    - Use bullet points (•) or numbered lists to explain steps clearly.
    - Highlight important actions or skills.
    - Use simple, clear language that students can easily understand.

Your tone must always be friendly, supportive, and encouraging — motivating students to feel confident about their future. You must never provide misleading or harmful advice, and you must never attempt humor, jokes, or creative expansions beyond what is required for the question.

Remember: You are a dedicated career mentor ONLY. You do not answer any other topics."""

    gemini_input = [{"role": "user", "parts": [prompt_text]}]
    for m in messages:
        role = m["role"]
        if role == "assistant":
            role = "model"
        gemini_input.append({"role": role, "parts": [m["content"]]})

    try:
        response = model.generate_content(gemini_input)
        reply = response.text.strip()
        messages.append({"role": "model", "content": reply})
        save_conversation(user_id, messages)
        return jsonify({"response": reply})
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': f'Failed to get response from Gemini: {str(e)}'}), 500

@app.route('/clear', methods=['POST'])
def clear():
    data = request.get_json()
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required.'}), 400

    try:
        clear_conversation(user_id)
        return jsonify({'message': 'Conversation cleared successfully.'})
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Failed to clear conversation.'}), 500
    
@app.route('/quiz', methods=['POST'])
def handle_quiz():
    data = request.json
    stream = data.get('stream')
    answers = data.get('answers', {})

    # Add explicit first question
    if not answers:
        if stream == "science":
            return jsonify({
                "type": "question",
                "question": "Which field are you most interested in within Science?",
                "options": ["Engineering", "Medical", "Pure Science & Research"]
            })
        elif stream == "commerce":
            return jsonify({
                "type": "question",
                "question": "Which area within Commerce excites you the most?",
                "options": ["Finance & Analysis", "Marketing & Sales", "Business Management", "Policy & Economics"]
            })
        elif stream == "arts":
            return jsonify({
                "type": "question",
                "question": "Which area in Arts & Humanities inspires you the most?",
                "options": ["Design & Visual Arts", "Performing Arts", "Social Sciences", "Literature & Languages"]
            })
        else:
            return jsonify({"error": "Invalid stream selected"}), 400

    # Compose prompt for Gemini for follow-up
    prompt = f"""
You are an adaptive career quiz assistant. The user selected stream: {stream}.
Here are the answers so far: {json.dumps(answers, indent=2)}

Based on these answers, decide what to do next:
- If you need to ask a new question to refine understanding, suggest a new question with 2-3 options.
- If enough answers are given, provide a final personalized career recommendation.

When providing the final recommendation, make sure to:
• Give a brief summary of the suggested career path.
• Include a list of **study lines or degree programs** to pursue (e.g., B.Tech in Computer Science, MBBS, B.Sc in Chemistry, BBA, BA in Psychology, etc.).
• Write these degree options in **bullet points**, and add a short reason why each option is good for the student.

Respond only as JSON in this format:
{{
  "type": "question" or "result",
  "question": "Next question text" (if type is question),
  "options": ["Option 1", "Option 2", ...] (if type is question),
  "result": "Your final career suggestion text with study lines and reasons" (if type is result)
}}
"""


    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)

        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3].strip()

        result_data = json.loads(text)
        return jsonify(result_data)

    except Exception as e:
        print(f"Error during Gemini call: {e}")
        return jsonify({"error": "Failed to generate quiz content"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)