FROM node:18.17.1-slim 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install


COPY . .

RUN npm run build

CMD ["npm", "run", "start"]


