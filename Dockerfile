FROM resin/raspberrypi3-node:7.8

COPY install /root/install

RUN chmod +x ~/install/install.sh && ~/install/install.sh

WORKDIR /root/src

# Copy only dependencies now to use cache when rebuilding
COPY src/package.json .
COPY src/yarn.lock .

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false
RUN npm install

ENV INITSYSTEM=on
COPY udevd.sh .
RUN chmod +x /root/src/udevd.sh
CMD ["/root/src/udevd.sh"]

COPY src .

ENTRYPOINT ["/root/src/node_modules/.bin/pm2-docker", "/root/src/start.js"]
