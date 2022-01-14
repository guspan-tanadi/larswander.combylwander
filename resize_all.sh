#!/usr/bin/env bash

for f in static/img/art/ribbons/high-res/*; do
  filename=$(basename $f)
  newpath=static/img/art/ribbons/thumbnail/$filename
  convert $f -resize 400x400 $newpath
  ./to_webp.sh $newpath
done
