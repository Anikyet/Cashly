# Stage 1: Builder
FROM node:20.12.0-slim AS builder

WORKDIR /usr/src/app

# Install build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy monorepo files
COPY package.json yarn.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages

# Install all dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN yarn run db:generate

# Build bank_webhook app
RUN yarn --cwd apps/bank_webhook build

# Stage 2: Production
FROM node:20.12.0-slim AS prod

WORKDIR /usr/src/app

# Install runtime deps
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy node_modules and packages
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages ./packages

# Copy built app
COPY --from=builder /usr/src/app/apps/bank_webhook/dist ./dist
COPY --from=builder /usr/src/app/apps/bank_webhook/package.json ./package.json

EXPOSE 5501

# Start the app
CMD ["node", "dist/index.js"]
