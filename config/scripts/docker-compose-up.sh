#!/bin/bash

# Run with Docker Compose
echo "Starting Todo App with Docker Compose..."
cd $(dirname "$0")/../../
docker compose -f config/docker/docker-compose.yml up -d

echo "Todo App is now running!"
echo "Access it at: http://localhost:8888"