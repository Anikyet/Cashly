# Stage 1: Build
FROM node:20.12.0-slim AS builder

WORKDIR /usr/src/app

# Accept DATABASE_URL as build argument
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Install build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy monorepo files
COPY package.json yarn.lock turbo.json ./
COPY apps/bank_webhook ./apps/bank_webhook
COPY packages ./packages

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN yarn run db:generate

# Build bank_webhook
RUN yarn --cwd apps/bank_webhook build

# Stage 2: Production
FROM node:20.12.0-slim AS prod

WORKDIR /usr/src/app

# Install runtime deps
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy built app and dependencies
COPY --from=builder /usr/src/app/apps/bank_webhook/dist ./apps/bank_webhook/dist
COPY --from=builder /usr/src/app/apps/bank_webhook/package.json ./apps/bank_webhook/package.json
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages ./packages

EXPOSE 5501

# Start the app
CMD ["yarn", "--cwd", "apps/bank_webhook", "start"]
