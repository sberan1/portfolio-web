FROM node:lts-slim

RUN apt-get update -y && apt-get install -y openssl
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build
COPY . .
ARG DATABASE_URL
RUN echo "DATABASE_URL=$DATABASE_URL" > .env
RUN npm install
RUN npx prisma generate
RUN npx vite build

EXPOSE 4250

ENTRYPOINT ["npm", "run", "start"]
