#!/bin/bash

# Check if a title was provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 \"Post Title\""
  exit 1
fi

# Set the post title and convert it to a valid file name
POST_TITLE="$1"
POST_FILENAME=$(echo "$POST_TITLE" | tr "[:upper:]" "[:lower:]" | sed "s/[^a-z0-9 ]//g" | tr " " "-")

# Set the date and file path
DATE=$(date +"%Y-%m-%d")
TIME=$(date +"%H:%M:%S")
FILE_PATH="_posts/$DATE-$POST_FILENAME.md"

# Check if the file already exists
if [ -f "$FILE_PATH" ]; then
  echo "Error: Post with the same file name already exists."
  exit 1
fi

# Create the YAML front matter
FRONT_MATTER="---
layout: post
title: \"$POST_TITLE\"
date: $DATE $TIME
description: "Description"
categories: blog
tags: add,tags
---"

# Create the new Jekyll post file with the front matter
echo "$FRONT_MATTER" > "$FILE_PATH"

# Notify the user of success
echo "Created new Jekyll post: $FILE_PATH"

subl . ./_posts/"$FILE_PATH"
