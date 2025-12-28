#Dev
FROM node:24-alpine AS dev
WORKDIR /next
COPY src ./src
COPY package.json .
COPY tsconfig.json .
COPY mui.d.ts .
COPY next.config.ts .
RUN npm install
CMD ["npm", "run", "dev"]