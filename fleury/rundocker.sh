#!/bin/bash
#sudo docker build -t challenge .
sudo docker run -p 8015:8015 -p 8016:8016 -p 8080:8080 -ti --rm -v /home/marcelo/Projetos/challenge/fleury:/opt/challenge challenge
