# Build stage
FROM node:20.11-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Add necessary build dependencies
RUN apk add --no-cache python3 make g++

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY frontend/web-app/package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy source files
COPY frontend/web-app/ ./

# Build arguments for environment variables
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG AUTH_PASSWORD
ARG NEXT_PUBLIC_BASE_URL
ARG PORT

# Create env file with build arguments
RUN echo "GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}" > .env.local && \
    echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env.local && \
    echo "NEXTAUTH_URL=${NEXTAUTH_URL}" >> .env.local && \
    echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env.local && \
    echo "AUTH_PASSWORD=${AUTH_PASSWORD}" >> .env.local && \
    echo "NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}" >> .env.local && \
    echo "PORT=${PORT}" >> .env.local

# Build the application
RUN npm run build

# Production stage
FROM node:20.11-alpine AS production

WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built assets and necessary files
COPY --from=builder --chown=appuser:appgroup /usr/src/app/.next ./.next
COPY --from=builder --chown=appuser:appgroup /usr/src/app/public ./public
COPY --from=builder --chown=appuser:appgroup /usr/src/app/package*.json ./
COPY --from=builder --chown=appuser:appgroup /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /usr/src/app/.env.local ./.env.local
COPY --from=builder --chown=appuser:appgroup /usr/src/app/next.config.js ./next.config.js

# Set user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost:8080/health || exit 1

# Start the application
CMD ["npm", "run", "start"]
