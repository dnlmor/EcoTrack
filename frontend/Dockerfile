# Frontend Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install react-router-dom

RUN npm install axios

RUN npm install tailwindcss postcss autoprefixer

RUN npm install react-chartjs-2 chart.js

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
