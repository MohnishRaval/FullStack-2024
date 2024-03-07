#!/bin/bash

# Stop and remove Docker Compose containers
docker-compose down

# Remove Docker Compose images
docker-compose rm -f

# Build Docker Compose images
docker-compose build

# Start Docker Compose containers
docker-compose up -d
