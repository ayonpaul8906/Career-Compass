# Use a Debian-based Python image as a parent image
# This allows us to easily install system packages like Tesseract
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt first to leverage Docker cache
# This means if requirements.txt doesn't change, these steps won't re-run
COPY requirements.txt .

# Install system dependencies required for Tesseract OCR
# - tesseract-ocr: The Tesseract OCR engine itself
# - tesseract-ocr-eng: English language data for Tesseract
# - poppler-utils: Required by PyPDF2 for PDF text extraction (sometimes)
# - libgl1-mesa-glx: Common dependency for Pillow/image processing on some systems
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        tesseract-ocr \
        tesseract-ocr-eng \
        poppler-utils \
        libgl1-mesa-glx && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Set the Tesseract command path as an environment variable (optional, but good practice)
# If tesseract is in a standard PATH location, this might not be strictly necessary,
# but it's good for explicit control.
ENV TESSERACT_PATH /usr/bin/tesseract

# Cloud Run automatically sets the PORT environment variable.
# Ensure your Flask app binds to this port.
# Gunicorn will pick up the PORT env var if not explicitly set in CMD.
ENV PORT 8080
EXPOSE 8080

# Run the Flask app using Gunicorn (a production-ready WSGI server)
# 'app:app' means the 'app' variable within the 'app.py' module
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]