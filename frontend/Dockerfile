# --- Stage 1: Build frontend ---
FROM node:18-alpine AS build
WORKDIR /app

# Копируем только фронтенд пакетный менеджер
COPY package.json package-lock.json ./

RUN npm install

# Копируем только исходники фронта
COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.node.json tsconfig.node.json
COPY src ./src
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.js ./

RUN npm run build

# --- Stage 2: Serve with NGINX ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Прокси на backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
