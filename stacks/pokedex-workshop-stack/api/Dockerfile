FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm prune --production
RUN chmod +x docker-entrypoint.sh
EXPOSE 3002
ENV NODE_ENV=production
ENTRYPOINT ["./docker-entrypoint.sh"]
