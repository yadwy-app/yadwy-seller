FROM oven/bun:1 AS install

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM install AS build

COPY . .
RUN bun run build

FROM node:22-slim AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/server/server.js"]
