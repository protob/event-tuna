# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app
ENV HOST 0.0.0.0
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./package.json /app/package.json
COPY ./nginx/default.conf /app/nginx/default.conf
RUN npm install
# RUN npm install @vue/cli@3.7.0 -g

# start app
CMD ["npm", "run", "dev"]
