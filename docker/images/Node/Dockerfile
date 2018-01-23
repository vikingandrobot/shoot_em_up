FROM node:9.4.0
MAINTAINER $'Kirushnapillai Sathiya <sathiya.kirushnapillai@heig-vd.ch> \n\
             Monteverde Mathieu <mathieu.monteverde@heig-vd.ch>'

COPY ["server.js", "package.json", "routes/index.js", "/opt/app/"]
COPY ["routes", "/opt/app/routes/"]
COPY ["views", "/opt/app/views/"]
COPY ["public", "/opt/app/public/"]

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/server.js"]
