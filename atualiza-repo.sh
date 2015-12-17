#!/bin/sh

git checkout staging
git pull origin staging
git checkout master
git pull origin master