FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm

RUN pnpm i

CMD ["pnpm", "test"]
