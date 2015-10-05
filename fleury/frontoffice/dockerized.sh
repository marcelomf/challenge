#!/bin/bash
cd /opt/challenge/middleware
node index.js &
cd /opt/challenge/frontoffice
/bin/bash -c "/usr/bin/mongod --smallfiles &"
sleep 3
grao main:create:admin --username marcelo --name Marcelo --email marcelomf@gmail.com --password admin123
sleep 3
#service mongodb start
node index.js
