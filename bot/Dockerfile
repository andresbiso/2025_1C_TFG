FROM python:3.13.3

# Set the working directory for the app
WORKDIR /usr/src/app

# Copy necessary files to the container
COPY requirements.txt .env main.py ./  
COPY submodules/ ./submodules/  
COPY ui/ ./ui/  
RUN mkdir ./images

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install python-telegram-bot[job-queue]

# Set the application command
CMD ["python", "-u", "./main.py"]
