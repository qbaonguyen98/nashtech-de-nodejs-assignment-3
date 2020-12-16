FROM node:14.15.0-alpine

RUN apt-get update || : && apt-get install python -y

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
