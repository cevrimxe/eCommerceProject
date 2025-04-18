# 1. Apache + PHP imajı
FROM php:8.2-apache

# 2. Gerekli PHP eklentileri (pgsql gibi)
RUN docker-php-ext-install pdo pdo_pgsql

# 3. Projeni Apache'nin root dizinine kopyala
COPY . /var/www/html/

# 4. (Opsiyonel) Apache'deki varsayılan index.php ayarı zaten mevcut
