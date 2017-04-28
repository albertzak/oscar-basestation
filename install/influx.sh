#!/bin/bash

set -e

echo "Installing InfluxDB..."
wget -O /tmp/influxdb.tar.gz -q $INFLUX_DOWNLOAD_URL
mkdir -p /tmp/influxdb
tar -xzvf /tmp/influxdb.tar.gz -C /tmp/influxdb
cp -av /tmp/influxdb/influx*/* /
rm /tmp/influxdb.tar.gz
rm -rf /tmp/influxdb

echo "Changing influxdb data to be stored in /data/influxdb..."
sed -i 's|/var/lib/influxdb|/data/influxdb|g' /etc/influxdb/influxdb.conf
