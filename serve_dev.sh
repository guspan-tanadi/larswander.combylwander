#!/usr/bin/env bash

mkdir public
pushd public
hugo
python3 -m http.server 2020
popd
