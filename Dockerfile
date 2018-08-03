FROM    alpine
RUN 	apk update \
	&& apk add sqlite \
	&& apk add nodejs \
	&& apk add npm 
COPY . /* /app/

WORKDIR /app



RUN npm install
RUN npm install sqlite3

RUN mkdir db

RUN node dbutils/createdb.js
RUN node dbutils/insertdata.js

EXPOSE 8080

CMD ["npm", "start"]

#ENTRYPOINT ["/bin/sh"]
