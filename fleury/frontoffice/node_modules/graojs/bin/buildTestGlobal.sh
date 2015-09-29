#!/bin/bash
rm -rf demo
grao generate:app --name demo --description Demo --author-name Synack --author-email int@synack.com.br --server-ports 8015,8016,8017,8018,8019,8020,8021,8022 --template-engine jade --theme graojs --mongodb-host localhost --mongodb-db grao
ls -laht demo/node_modules/graojs/
cd demo
grao generate:schema --schema user --force
cp ../UserSchema.js bundles/user/
grao generate:schemabundle --schema user --force
node index.js
