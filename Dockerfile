FROM node:carbon

RUN mkdir /app
WORKDIR /app



# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK CMD curl -fs http://localhost:$PORT/api/status/ping || exit 1

ENV PATH /app/node_modules/.bin:$PATH

ADD .npmrc /app
ADD package.json /app
RUN cd /app && npm install 

ADD . /app
RUN npm run build

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
# default to port 80 for node, and 5858 or 9229 for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 5858 9229

CMD [ "node", "dist/index.js" ]