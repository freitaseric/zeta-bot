# base image configuration
FROM oven/bun:latest
WORKDIR /app

# installing dependencies
COPY package.json bun.lockb /app/
RUN bun install --frozen-lockfile --production

# setting up prisma
COPY prisma/ /app/
RUN bunx prisma generate

# copying all missing files
COPY . .

# running app
ENTRYPOINT [ "bun", "start:prod" ]