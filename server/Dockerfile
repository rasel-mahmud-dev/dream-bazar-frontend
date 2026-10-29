# ==========================================
# Development Stage
# ==========================================
FROM node:20-slim AS development

WORKDIR /app

# Install native dependencies for node-gyp / sqlite3 / curl
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy application code
COPY . .

# Expose backend port
EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=development

# Start development server with hot-reloading
CMD ["npm", "run", "start"]

# ==========================================
# Builder Stage
# ==========================================
FROM development AS builder

# Transpile / build TypeScript if needed
RUN npm run build || true

# ==========================================
# Production Stage
# ==========================================
FROM node:20-slim AS production

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=4000

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/index.js ./
COPY --from=builder /app/copy-dir.js ./

EXPOSE 4000

CMD ["node", "index.js"]
