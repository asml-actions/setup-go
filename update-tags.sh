#!/bin/bash

declare -a OLD_TAGS=("v1" "v1.0.0" "v1.0.1" "v1.0.2" "v1.1.0" "v1.1.1" "v1.1.2" "v2" "v2.0.1" "v2.0.2" "v2.0.3" "v2.1.0" "v2.1.1" "v2.1.2" "v2.1.3" "v2.1.4" "v2.1.5" "v2.2.0" "v3" "v3.0.0")
declare -a TAGS=("v1" "v2" "v3" "v5")

for TAG in ${OLD_TAGS[@]}; do
    git tag -d $TAG
    git push --delete origin $TAG
    git push --delete prd $TAG
    git push --delete acc $TAG
done

for TAG in ${TAGS[@]}; do
    git tag $TAG
    git push --tags -u origin -f
    git push --tags -u prd -f
    git push --tags -u acc -f
done
