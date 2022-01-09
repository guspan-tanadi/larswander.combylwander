#!/usr/bin/env bash

for f in static/img/art/unfolded/5000x5000/*; do
  filename=$(basename $f)
  newpath=static/img/art/unfolded/thumbnail/$filename
  convert $f -resize 400x400 $newpath
  ./to_webp.sh $newpath
done
