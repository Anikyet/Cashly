# -------------------------------
# Stage 1: Builder
# -------------------------------
FROM node:20.12.0-slim AS builder

WORKDIR /usr/src/app

# Install build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy monorepo root files
COPY package.json yarn.lock turbo.json ./

# Copy apps and packages
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client for db package
RUN yarn --cwd packages/db prisma generate

# Build bank_webhook app (include @repo/db in bundle)
RUN yarn --cwd apps/bank_webhook build

# -------------------------------
# Stage 2: Production
# -------------------------------
FROM node:20.12.0-slim AS prod

WORKDIR /usr/src/app

# Install runtime dependencies
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy node_modules and packages from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages ./packages

# Copy built bank_webhook app
COPY --from=builder /usr/src/app/apps/bank_webhook/dist ./dist
COPY --from=builder /usr/src/app/apps/bank_webhook/package.json ./package.json

# Expose configurable port (default 5501)
ENV PORT=5501
EXPOSE $PORT

# Start the app using PORT env
CMD ["node", "dist/index.js"]

