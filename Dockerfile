FROM node:18 as base

WORKDIR /home/node/app

# copy configs
COPY --chown=node:node package*.json ./

RUN npm install --quiet

COPY . .

FROM base as production

CMD ["./entrypoint.sh"]


