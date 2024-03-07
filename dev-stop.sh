#!/bin/bash

# Stop and remove Docker Compose containers
docker-compose down

# Remove Docker Compose images
docker-compose rm -f
