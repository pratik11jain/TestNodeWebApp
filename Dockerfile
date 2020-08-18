FROM node:12.18.3-stretch-slim

WORKDIR /app

COPY . . 

CMD [ "npm","run","start" ]

# Set production mode:
ENV NODE_ENV production

RUN npm install && npm run build
