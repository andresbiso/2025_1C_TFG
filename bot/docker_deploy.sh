#!/bin/bash

# Check if container name is supplied
if [ "$#" -eq 0 ]; then
    echo "Especificar un nombre de container! (Ejemplo: telegram_bot)"
    exit 1
fi

# Assign the first argument to a variable
CONTAINER_NAME=$1

# Define a consistent image name
IMAGE_NAME="platform-connect-bot"

# Ensure the environment file exists
if [ ! -f ./.env ]; then
    echo "El archivo de ambiente .env no fue encontrado! Cancelando..."
    exit 1
fi

# Check if a container with the same name already exists
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo "Ya existe un container con el nombre $CONTAINER_NAME!"
    
    # If it's running, stop it
    if [ "$(docker ps -aq -f status=running -f name=$CONTAINER_NAME)" ]; then
        echo "Deteniendo container..."
        docker stop $CONTAINER_NAME
        echo "Container detenido."
    fi

    # Remove the stopped container
    echo "Eliminando container detenido..."
    docker rm -f $CONTAINER_NAME
    echo "Container eliminado."
fi

echo "Construyendo imagen $IMAGE_NAME:latest"
# Build/Rebuild the Docker image
docker build --no-cache -t $IMAGE_NAME:latest . 

echo "Ejecutando container $CONTAINER_NAME desde imagen $IMAGE_NAME:latest"
# Run a new container
docker run -p 9020:9020 -d --restart always --name $CONTAINER_NAME --env-file ./.env $IMAGE_NAME:latest
