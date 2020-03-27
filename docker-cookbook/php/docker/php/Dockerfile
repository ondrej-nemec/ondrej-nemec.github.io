FROM php:7.4.2-fpm
COPY install-composer.sh /tmp/
RUN \
    apt-get update \
    && apt-get install -y libpq-dev \
    && apt-get install -y git unzip wget
RUN /tmp/install-composer.sh \
    && mv ./composer.phar /usr/local/bin/composer