#!/bin/bash
cd emsdk-portable
source ./emsdk_env.sh
cd ..
emcc --bind -o ./public/jslib.js ./jslib/bind.cpp
