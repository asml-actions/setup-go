#!/bin/bash

declare -a TAGS=("v1" "v2" "v3")

for TAG in ${TAGS[@]}; do
    git tag -d $TAG
    git push --delete origin $TAG
    git tag $TAG
    git push --tags
done
