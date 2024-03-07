#Project requirements
SETUP:
a. install lerna-npm install -g lerna
b. in root: npm install
c. npm start in devlopment stage

A. Extensions:

1. eslint by microsoft
2. node version 20.12

B. #Running the project-For Backend
1.npm run dev
2.npm run start

C. #Running For Frontend

1.  npm run dev

D. Add .env file in your backend folder

#DOCKER-COMPOSE

1. docker-compose build
2. docker-compose up=>for running docker compose
3. docker-compose down=>for stopping docker compose
4. docker rmi fullstack-2024_backend:latest fullstack-2024_frontend:latest (delete created imaages if you want)
5. for running frontend along on docker:
   a. docker build -t reactfrontend:latest .
   b. docker run -p 3000:3000 reactfrontend:latest

6. Lernajs
   a. npx lerna clean
   b.npx lerna list
   c.npx lerna repair
   d.npx lerna start
   e.npx lerna build

---

testing for dev in docker:

1. run ./dev-start.sh to start
2. run ./dev-stop.sh to stop
