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

# Copy the app and packages
COPY apps/bank_webhook ./apps/bank_webhook
COPY packages ./packages

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client (no DB connection required)
RUN yarn run db:generate

# Build the app
RUN yarn --cwd apps/bank_webhook build

# -------------------------------
# Stage 2: Production
# -------------------------------
FROM node:20.12.0-slim AS prod

WORKDIR /usr/src/app

# Install runtime dependencies
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy built app and required packages
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages ./packages
COPY --from=builder /usr/src/app/apps/bank_webhook/dist ./dist
COPY --from=builder /usr/src/app/apps/bank_webhook/package.json ./package.json

EXPOSE 5501

# Start the app
CMD ["node", "dist/index.js"]
