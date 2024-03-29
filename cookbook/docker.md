# Docker example

```
version: '2.4'
services:
  java:
  # docker-compose exec -w /project java sh
  # docker-compose exec -w /project java ./gradlew
    init: true
    image: openjdk:15-jdk-alpine
   # build:
   #   context: docker/java
    volumes:
      - .:/project # read only in production?
    restart: always
    # command: /bin/sh -c /project/hotspot/bin/hotspot
    command: tail -f /dev/null
  web:
  # docker-compose exec -w /project web bash
    init: true
    image: nginx:1.16-alpine
    volumes:
      - .:/project:ro
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - php
    # ports:
    #   - "80:80"
    #   - "443:443"
    restart: always

  php:
  # docker-compose exec -w /project php bash
  # docker-compose exec php composer <args>
    user: "1000:1000" #todo - current user
    init: true
    build:
      context: docker/php
    # image: php:7.4.2-fpm
    volumes:
      - .:/project # read only in production?
      - ./docker/php/php.production.ini:/usr/local/etc/php/php.ini
    restart: always
    tty: true
    
  ssl_proxy:
    init: true
    image: nginx:1.16-alpine
    volumes:
      - ./docker/ssl_proxy:/etc/nginx/conf.d
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    ports:
      - "80:80"
      - "443:443"
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
    restart: always

  certbot:
    init: true
    image: certbot/certbot
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
    restart: always
```