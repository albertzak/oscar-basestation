#!/bin/bash

set -e

INFLUX_VERSION=1.2.2

if [[ $(uname -m) == "armv7l" ]]; then
  echo "Running on ARM"
  INFLUX_ARCH=armhf
else
  echo "Running on x86_64"
  INFLUX_ARCH=amd64
fi


export INFLUX_DOWNLOAD_URL=https://dl.influxdata.com/influxdb/releases/influxdb-${INFLUX_VERSION}_linux_${INFLUX_ARCH}.tar.gz

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $DIR

bash ./influx.sh



popd
