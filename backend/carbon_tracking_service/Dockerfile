# Use the official Python runtime as a parent image
FROM python:3.12.4-slim

# Set the working directory
WORKDIR /app

# Install system dependencies needed for psycopg2 and other Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose the required port
EXPOSE 8001

# Command to run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
