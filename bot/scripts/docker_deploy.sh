#!/bin/bash

# Check if container name is supplied
if [ "$#" -eq 0 ]; then
    echo "Please specify a container name!"
    exit 1
fi

# Assign the first argument to a variable
CONTAINER_NAME=$1

# Define a consistent image name
IMAGE_NAME="platform-connect-bot"

# move to parent directory
cd ..

# Ensure the environment file exists
if [ ! -f ./.env ]; then
    echo "Environment file .env not found! Exiting..."
    exit 1
fi

# Check if a container with the same name already exists
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo "An existing container with the name $CONTAINER_NAME was found!"
    
    # If it's running, stop it
    if [ "$(docker ps -aq -f status=running -f name=$CONTAINER_NAME)" ]; then
        echo "Stopping container..."
        docker stop $CONTAINER_NAME
        echo "Container stopped."
    fi

    # Remove the stopped container
    echo "Removing stopped container..."
    docker rm -f $CONTAINER_NAME
    echo "Container removed."
fi

echo "Building image $IMAGE_NAME:latest"
# Build/Rebuild the Docker image
docker build --no-cache -t $IMAGE_NAME:latest . 

echo "Running container $CONTAINER_NAME from image $IMAGE_NAME:latest"
# Run a new container
docker run -d --restart always --name $CONTAINER_NAME --env-file ./.env $IMAGE_NAME:latest

# return to the original directory
cd -
