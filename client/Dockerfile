# ==========================================
# Development Stage
# ==========================================
FROM node:20-slim AS development

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 7000

ENV PORT=7000

# Start Vite dev server accessible externally
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "7000"]

# ==========================================
# Builder Stage (Production)
# ==========================================
FROM development AS builder

ARG VITE_BACKEND_URL=http://localhost:4000
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build production bundle
RUN npm run build

# ==========================================
# Production Runtime Stage (Nginx)
# ==========================================
FROM nginx:alpine AS production

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
