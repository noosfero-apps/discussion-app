#!/usr/bin/bash

gulp clean && gulp build --staging
git add --all -f dist/
git commit -m "Update dist"
git push origin staging && wget -qO- --no-check-certificate 'ci.serpro/view/Noosfero/job/DialogaApp-Deploy-Homologa%C3%A7%C3%A3o/build?token=DIALOGA_TOKEN' &> /dev/null
