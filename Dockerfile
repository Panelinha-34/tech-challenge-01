FROM node:lts as base

WORKDIR /home/node/app

# copy configs
COPY --chown=node:node package*.json ./

RUN npm install --quiet

COPY . .

FROM base as production

RUN npm run build
CMD ["node", "build/adapter/driver/api/server.js"]


