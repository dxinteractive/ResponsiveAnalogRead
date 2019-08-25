#!/bin/bash
cd emsdk-portable
source ./emsdk_env.sh
cd ..
emcc --bind ./wasm/bind.cpp -O3 -s WASM=1 -s MODULARIZE=1 -o ./wasm/wasm.js -I ./wasm
