# 🌟 Career Compass 🌟

### 🎯 **Problem Statement:**

Students and young professionals often feel overwhelmed by the wide variety of career paths available — lacking personalized guidance, concrete roadmaps, and access to verified opportunities across different streams.

---

**Career Compass** is a modern, AI-powered web application designed to **empower users to confidently navigate their career journey**.
It combines AI mentorship, dynamic quizzes, curated opportunities, and structured roadmaps into a single cohesive platform.

From science and commerce to arts and technology, Career Compass guides users at every step with **personalized, actionable advice** — making it the perfect all-in-one career planning companion.

---

## Core Google & Cloud Tech Used

```
1. Google Gemini API (AI career mentor & suggestions)
2. Firebase (Firestore, Hosting, Authentication)
3. Render (backend hosting)
4. Framer Motion & Shadcn UI (frontend animations & UI)
5. Lucide Icons
```

---

## 🚀 Features

### 1️⃣ AI Career Mentor

* Chat with an AI mentor powered by Gemini
* Personalized answers tailored to your interests and goals
* Provides step-by-step career suggestions, study line options, and skill-building tips

### 2️⃣ Interactive Career Quiz

* Fun, dynamic quiz to understand your strengths and preferences
* Suggests suitable streams (e.g., Science, Commerce, Arts) and potential roles
* Clear final recommendations in bullet points with concise reasoning

### 3️⃣ Opportunities Board

* Explore internships, hackathons, workshops, and more — from **all streams**, not just tech
* Filter opportunities by type, location, and department (technical, finance, arts, etc.)
* Clean, minimal cards with dynamic hover animations and on-card detail pop-ups

### 4️⃣ Career Roadmaps

* Visual, easy-to-follow roadmaps for diverse careers (e.g., Data Scientist, Graphic Designer, CA, Civil Services)
* Structured stages, milestone suggestions, and recommended skills
* Filter by department and sector to find your ideal path

### 5️⃣ Dynamic, Modern Dashboard

* Consistent blue-themed design with light/dark mode support
* Smooth animations using Framer Motion
* Responsive, minimal UI inspired by top design systems

---

## Snapshots

| 💬 AI Mentor                               | 📝 Quiz & Result                      | 🌐 Opportunities Board                         |
| ------------------------------------------ | ------------------------------------- | ---------------------------------------------- |
| ![AI Mentor](https://github.com/user-attachments/assets/8d922063-37dd-43a2-801c-1168884c379a) | ![Quiz](https://github.com/user-attachments/assets/e147b1cf-b4e0-4448-9474-4dd45828c612) | ![Opportunities](https://github.com/user-attachments/assets/e8fd01db-b30e-4960-b278-6a968801c440) |

| 🗺️ Roadmaps                              | 📊 Dashboard Overview                      |
| ----------------------------------------- | ------------------------------------------ |
| ![Roadmaps](https://github.com/user-attachments/assets/e363fa70-fe5c-4221-ba14-2382e69d5d35) | ![Dashboard](https://github.com/user-attachments/assets/00a7708f-87c4-4cbf-872e-06fbbaccc15c) |

---

## 🛠️ Tech Stack

* **Frontend**: React.js (Vite), Tailwind CSS, Shadcn UI, Framer Motion
* **Backend**: Flask (Python), Google Gemini API
* **Database**: Firebase Firestore (stores user data and chat logs)
* **Deployment**:

  * Frontend on Firebase Hosting
  * Backend on Render
* **Other**: Lucide Icons, Firebase CLI, GitHub Actions (CI/CD)

---

## 📁 Repository Structure

```
carrer-compass/
├── frontend/
│   ├── src/pages
│   ├── src/components
│   ├── src/dashboard
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── firebase-adminsdk.json
├── firebase.json
├── .firebaserc
└── README.md
```

---

## Firestore Schema

```
career_compass_conversations:
[
  {
    timestamp,
    userQuestion,
    aiAnswer,
    recommendedStream,
    recommendedRoles,
    roadmapSuggestions
  }
]
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/ayonpaul8906/Career-Compass-GDG
cd carrer-compass
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 4️⃣ Deployment

* Backend → Deploy on Render
* Frontend → Firebase Hosting (`firebase deploy` after build)

---

## 🌟 Why Career Compass?

Career Compass enables anyone — from students to career switchers — to:

✅ Understand their interests and strengths through quizzes
✅ Discover opportunities tailored to different streams and departments
✅ Get AI-powered personalized guidance and study line suggestions
✅ Follow structured career roadmaps
✅ Build a future-ready profile with the right skills and milestones

---

# 👨‍💻 Made with 💙 by \[AYON PAUL]

* [GitHub](https://github.com/ayonpaul8906)
* [LinkedIn](https://www.linkedin.com/in/ayon2407s/)

---

## ⭐ License

Distributed under the MIT License. See `LICENSE` for details.

---

## 🙏 Acknowledgements

* Google Gemini API
* Firebase
* Render
* Lucide Icons
* Framer Motion
* Shadcn UI

---

### 🚀 Let's help the next generation build bold, meaningful careers — with confidence!
