#!/usr/bin/env bash

rm -r public
hugo
gsutil cp -m -r public/* gs://lwander-site/
