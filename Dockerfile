# FROM debian:latest
FROM node:18
COPY ./manager /manager/
COPY ./minecraft /minecraft/
RUN apt-get update && \
    apt-get install -y libcurl4
#RUN apt -y install language-pack-ja-base language-pack-ja ibus-kkc && \
#    localectl set-locale LANG=ja_JP.UTF-8 LANGUAGE="ja_JP:ja"
#日本語ダウンロードくっそ遅いから後回し
RUN cd /manager && npm i
RUN chmod 744 /manager
RUN chmod 744 /minecraft
CMD cd /manager && sh start.sh