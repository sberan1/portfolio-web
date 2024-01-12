FROM node:lts-slim

RUN apt-get update -y && apt-get install -y openssl
ENV NODE_ENV=development

ARG SUPABASE_URL
ARG SUPABASE_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_KEY=$SUPABASE_KEY

# Rest of your Dockerfile...
WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build
COPY . .
RUN npm install
RUN npx prisma generate
RUN npx vite build

EXPOSE 4250

CMD [ "sh", "entrypoint.sh" ]
