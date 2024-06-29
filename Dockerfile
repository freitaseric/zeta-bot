# base image configuration
FROM oven/bun:latest
WORKDIR /home/app

# copying project
COPY . .

# install dependencies
RUN bun install --frozen-lockfile --production

# run app
ENTRYPOINT [ "bun", "start:prod" ]