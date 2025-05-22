#!/bin/bash

# Build the Docker image
echo "Building Todo App Docker image..."
cd $(dirname "$0")/../../
docker build -t todo-app:latest -f config/docker/Dockerfile .

echo "Done! Image built successfully."
echo "Run the container with: ./config/scripts/run.sh"