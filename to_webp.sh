#!/usr/bin/env bash

no_ext="${1%%.*}"

cwebp -q 100 ${1} -o ${no_ext}.webp
