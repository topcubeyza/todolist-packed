
FROM node:10.15.3
RUN mkdir -p /srv/app/todo-fe
WORKDIR /srv/app/todo-fe

COPY package.json /srv/app/todo-fe
COPY package-lock.json /srv/app/todo-fe

RUN npm install

COPY . /srv/app/todo-fe

CMD ["npm","start"]


