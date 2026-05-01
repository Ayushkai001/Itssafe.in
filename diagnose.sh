#!/bin/bash
# Run this ENTIRE script on your VPS in one paste
# It will give us everything we need to proceed

echo "=== /root/ contents ==="
ls -la /root/

echo ""
echo "=== Searching for docker-compose files (all extensions) ==="
find / -name "docker-compose*" -not -path "*/proc/*" -not -path "*/sys/*" 2>/dev/null

echo ""
echo "=== Existing nginx config (read from INSIDE container) ==="
docker exec helmet-frontend cat /etc/nginx/conf.d/default.conf

echo ""
echo "=== Raw mount info for helmet-frontend ==="
docker inspect helmet-frontend --format='{{json .Mounts}}' | python3 -m json.tool 2>/dev/null || docker inspect helmet-frontend | python3 -c "import json,sys; d=json.load(sys.stdin); print(json.dumps(d[0].get('Mounts',[]), indent=2))"

echo ""
echo "=== Letsencrypt certs on HOST ==="
ls /root/spy-helmet-root/certbot/conf/live/ 2>/dev/null || ls /etc/letsencrypt/live/ 2>/dev/null || echo "No certs found at standard paths"

echo ""
echo "=== DONE ==="
