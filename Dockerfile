FROM node:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y mysql-client && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 9001

CMD ["npm", "start"]
