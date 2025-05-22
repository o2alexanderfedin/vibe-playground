#!/bin/bash

# Build the Docker image
echo "Building Todo App Docker image..."
docker build -t todo-app:latest .

echo "Done! Image built successfully."
echo "Run the container with: ./scripts/run.sh"