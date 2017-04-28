#!/bin/bash

set -e

echo "Updating apt-get"
apt-get -yq update
apt-get -y install apt-transport-https

echo "Adding yarn repository"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get -yq update

echo "Installing yarn"
apt-get -y install yarn
