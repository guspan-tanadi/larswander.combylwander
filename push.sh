#!/usr/bin/env bash

rm -r public
hugo
gsutil -m rsync -c -r public/ gs://lwander-site/
