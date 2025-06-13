# Dockerfile in project root
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
VOLUME /app/public/images
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
