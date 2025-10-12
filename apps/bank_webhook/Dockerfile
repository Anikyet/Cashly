# Stage 1: Build
FROM node:20.12.0-slim AS builder

WORKDIR /usr/src/app

# Install build tools (for Prisma generate & esbuild)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy root monorepo files
COPY package.json yarn.lock turbo.json ./

# Copy app and shared packages
COPY apps/bank_webhook ./apps/bank_webhook
COPY packages ./packages

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN yarn run db:generate

# Build bank_webhook (exclude Prisma)
RUN yarn --cwd apps/bank_webhook build

# Stage 2: Production
FROM node:20.12.0-slim AS prod

WORKDIR /usr/src/app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy dist folder
COPY --from=builder /usr/src/app/apps/bank_webhook/dist ./apps/bank_webhook/dist

# Copy package.json and node_modules (includes Prisma binaries)
COPY --from=builder /usr/src/app/apps/bank_webhook/package.json ./apps/bank_webhook/package.json
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages ./packages

# Expose port
EXPOSE 5501

# Start the app
CMD ["yarn", "--cwd", "apps/bank_webhook", "start"]
