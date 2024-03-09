# Project Requirements

## Setup

a. Install lerna: `npm install -g lerna`

b. In the root: `npm install`

c. Run in development stage: `npm start`

## Extensions

1. Eslint by Microsoft
2. Node version 20.12

## Running the Project - Backend

1. Run development server: `npm run dev`
2. Run production server: `npm run start`

## Running the Project - Frontend

1. Run the development server: `npm run dev`

## Add .env File

1. Add a `.env` file in your backend folder.

## Docker Compose

1. Build Docker Compose images: `docker-compose build`
2. Run Docker Compose: `docker-compose up` (for running Docker Compose)
3. Stop Docker Compose: `docker-compose down` (for stopping Docker Compose)
4. Delete created images (if needed): `docker rmi fullstack-2024_backend:latest fullstack-2024_frontend:latest`
5. For running frontend along on Docker:
   a. Build the Docker image: `docker build -t reactfrontend:latest .`
   b. Run the Docker container: `docker run -p 3000:3000 reactfrontend:latest`

## Lerna.js

1. Clean Lerna project: `npx lerna clean`
2. List Lerna packages: `npx lerna list`
3. Repair Lerna setup: `npx lerna repair`
4. Start Lerna project: `npx lerna start`
5. Build Lerna project: `npx lerna build`

---

Testing for development in Docker:

1. Run `./dev-start.sh` to start.
2. Run `./dev-stop.sh` to stop.

## Hosting Address

1. 18.235.217.2
