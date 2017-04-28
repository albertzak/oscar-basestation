#!/bin/bash

udevd &
udevadm trigger &> /dev/null
