# ============================
# Stage 1: Builder
# ============================
FROM node:20.12.0-alpine3.19 AS builder

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy monorepo root files
COPY package.json yarn.lock turbo.json ./

# Copy only necessary packages and apps
COPY packages/db ./packages/db
COPY packages/typescript-config ./packages/typescript-config
COPY apps/bank_webhook ./apps/bank_webhook

# Install dependencies
RUN yarn install --frozen-lockfile --inline-builds

# Generate Prisma client for @repo/db
RUN yarn --cwd packages/db prisma generate

# Build bank_webhook (including @repo/db via turbo)
RUN yarn turbo run build --filter=bank_webhook

# ============================
# Stage 2: Runner
# ============================
FROM node:20.12.0-alpine3.19 AS runner

WORKDIR /usr/src/app

# Set environment
ENV NODE_ENV=production
ENV PORT=5501
EXPOSE $PORT

# Copy node_modules and built files from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/bank_webhook ./apps/bank_webhook

# Copy Prisma binaries (necessary for Query Engine)
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

WORKDIR /usr/src/app/apps/bank_webhook

# Start the app
CMD ["node", "dist/index.js"]
