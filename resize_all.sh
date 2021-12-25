#!/usr/bin/env bash

for f in static/img/art/gossamer/5000x5000/*; do
  filename=$(basename $f)
  newpath=static/img/art/gossamer/thumbnail/$filename
  convert $f -resize 400x400 $newpath
  ./to_webp.sh $newpath
done
