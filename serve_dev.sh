#!/usr/bin/env bash

pushd public
hugo
python3 -m http.server 2020
popd
