# Step 1: Use a Python base image
FROM python:3.12-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the requirements.txt file into the container
COPY requirements.txt .

# Step 4: Install dependencies from the requirements file
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 6: Expose the port the app will run on (now using port 8001)
EXPOSE 8001

# Step 7: Set the environment variable for Python to run in production mode
ENV PYTHONUNBUFFERED 1

# Step 8: Start the application (FastAPI app with uvicorn, using port 8001 and with reload enabled)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
