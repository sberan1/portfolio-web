FROM node:lts-slim

RUN apt-get update -y && apt-get install -y openssl
ENV NODE_ENV=development

ARG PUBLIC_SUPABASE_URL
ARG PUBLIC_SUPABASE_ANON_KEY
ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL
ENV PUBLIC_SUPABASE_ANON_KEY=$PUBLIC_SUPABASE_ANON_KEY

# Rest of your Dockerfile...
WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build
COPY . .
RUN npm install
RUN npx vite build

EXPOSE 4250

CMD [ "sh", "entrypoint.sh" ]
