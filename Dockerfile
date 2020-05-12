
FROM node:12.13.0

WORKDIR /app
COPY . .

RUN npm ci

CMD ["npm", "run", "start:dev"]
