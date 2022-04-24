#!/usr/bin/env bash

SRC=static/img/art/geode/5000x5000/
TRGT=static/img/art/geode/thumbnail/

mkdir -p $TRGT

for f in ${SRC}*; do
  echo $f 
  filename=$(basename $f)
  newpath="${TRGT}$filename"
  convert $f -resize 400x400 $newpath
  ./to_webp.sh $newpath
done
