# Etapa de build
FROM node:20-slim AS build

WORKDIR /app

# Use faster, more reliable registry
RUN npm config set registry https://registry.npmmirror.com

# Copy only necessary files first to leverage caching
COPY package.json package-lock.json ./

# Install deps with minimal peer conflict handling
RUN npm install --legacy-peer-deps

# Now copy the full source code
COPY . .

# Build the app
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copy compiled output to NGINX public folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
