#!/usr/bin/env bash

rm -r public
hugo
gsutil -m cp -r public/* gs://lwander-site/
