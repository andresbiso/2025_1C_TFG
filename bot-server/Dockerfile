FROM python:3.13.3

# Set the working directory for the app
WORKDIR /usr/src/app

# Copy necessary files to the container
COPY requirements.txt .env main.py ./  
COPY api/ ./api/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 9020

# Set the application command
CMD ["python", "-u", "./main.py"]
