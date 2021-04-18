#!/usr/bin/env bash

pushd public
python3 -m http.server 2020
popd
