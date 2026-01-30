# Use official Python runtime as a parent image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (Tesseract OCR)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn uvicorn

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application using Gunicorn (adapter for Uvicorn)
CMD ["gunicorn", "wsgi:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
