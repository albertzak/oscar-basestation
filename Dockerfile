FROM resin/raspberrypi3-node:7.8

COPY ./install /root/install

RUN ls ~

RUN chmod +x ~/install/install.sh && ~/install/install.sh

WORKDIR /root/src

# Copy only dependencies now to use cache when rebuilding
COPY src/package.json .
COPY src/yarn.lock .

RUN yarn

COPY src .

CMD ["/root/src/node_modules/.bin/pm2-docker", "/root/src/start.js"]
