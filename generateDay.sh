#!/usr/bin/env bash

echo "Enter day number (01-25)"
read DAY

DIRECTORY="day-$DAY"

if [[ -d $DIRECTORY ]]; then
  echo "Error: $DIRECTORY directory already exists."
  exit 1
fi

cp -r day-template/ $DIRECTORY
sed -i "s/template/$DAY/g" "$DIRECTORY/index.js"
sed -i "s/Template/$DAY/g" "$DIRECTORY/index.js"
sed -i "s/Template/$DAY/g" "$DIRECTORY/index.test.js"
