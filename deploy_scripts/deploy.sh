#!/usr/bin/env bash
ls -l
ssh-keyscan -H "$1" >> ~/.ssh/known_hosts
ssh "deploy@$1" "rm -rf ~/public_html/*"
scp -r ./dist/ "deploy@$1:~//public_html/"