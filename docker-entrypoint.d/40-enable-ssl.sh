#!/bin/sh
set -e

SSL_DIR="/etc/nginx/ssl"
SSL_CONF="/etc/nginx/conf.d/ssl.conf"
DEFAULT_CONF="/etc/nginx/conf.d/default.conf"

if [ -f "$SSL_DIR/fullchain.pem" ] && [ -f "$SSL_DIR/privkey.pem" ]; then
    echo "SSL certificates found — enabling HTTPS on port 443"
    cp /etc/nginx/conf.d/ssl.conf.template "$SSL_CONF"
    rm -f "$DEFAULT_CONF"
else
    echo "No SSL certificates mounted — serving HTTP on port 80 (Dokploy can terminate SSL at the edge)"
    rm -f "$SSL_CONF"
fi
