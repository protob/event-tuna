# FROM node:10.15

# ENV APP_ROOT /src

# RUN mkdir ${APP_ROOT}
# WORKDIR ${APP_ROOT}
# ADD . ${APP_ROOT}

# RUN npm ci
# RUN npm run build

# ENV HOST 0.0.0.0


# # base image
# FROM node:12.2.0-alpine

# # ENV APP_ROOT /src

# # RUN mkdir ${APP_ROOT}
# # WORKDIR ${APP_ROOT}
# # ADD . ${APP_ROOT}

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /app/package.json
# # COPY package.json /app/package.json
# # RUN npm ci
# # RUN npm install @vue/cli@3.7.0 -g
# RUN npm install

# # start app
# CMD ["npm", "run", "dev"]






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
