#!/bin/sh

git push origin master

git checkout staging
git pull origin staging

git merge master