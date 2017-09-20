#!/bin/bash

DBNAME='richmondGIS'
# Drop the db
mongo $DBNAME --eval "db.dropDatabase()"

# Load each JSON file
FILES=./data/*
for f in $FILES
do
  echo "Processing $f file..."
  # import each data file with 'mongoimport'
  mongoimport --db $DBNAME --collection incidents --file $f
done
