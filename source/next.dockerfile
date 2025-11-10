FROM node:24-alpine
WORKDIR /next
COPY src ./src
COPY package.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
RUN npm install
RUN npm run build
CMD npm run start