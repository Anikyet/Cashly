# ===========================
# Stage 1: Builder
# ===========================
FROM node:20.12.0-alpine3.19 AS builder

WORKDIR /usr/src/app

# Copy monorepo manifest files
COPY package.json yarn.lock turbo.json ./
COPY apps ./apps
COPY packages ./packages

# Install all dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN yarn run db:generate

# Build only the user_app
RUN yarn turbo run build --filter=user_app

# ===========================
# Stage 2: Runner
# ===========================
FROM node:20.12.0-alpine3.19 AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=5500
EXPOSE 5500

# Copy root manifest files
COPY package.json yarn.lock turbo.json ./

# Copy built files from builder
COPY --from=builder /usr/src/app/apps/user_app ./apps/user_app
COPY --from=builder /usr/src/app/packages ./packages
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Start your app
CMD ["yarn", "workspace", "user_app", "start"]
