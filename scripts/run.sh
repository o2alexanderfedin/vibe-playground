#!/bin/bash

# Check if container already exists
if [ "$(docker ps -a -q -f name=todo-app)" ]; then
    echo "Stopping and removing existing Todo App container..."
    docker stop todo-app
    docker rm todo-app
fi

# Run the Docker container
echo "Starting Todo App container..."
docker run -d -p 8080:80 --name todo-app todo-app:latest

echo "Todo App is now running!"
echo "Access it at: http://localhost:8080"