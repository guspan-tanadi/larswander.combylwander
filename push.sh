#!/usr/bin/env bash

rm -r public
hugo
gsutil cp -r public/* gs://lwander-site/
