#!/bin/bash

udevd &
udevadm trigger &> /dev/null

# Find vendor and product id with `lsusb` and modify the line below
lsusb
modprobe ftdi_sio vendor=0x0403 product=0x6001
