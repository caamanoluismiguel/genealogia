#!/usr/bin/env bash
# Download all 426 images from PARES catalog 6092354
# (Comprobaciones de Catastro de Galicia)
set -euo pipefail

cd "$(dirname "$0")"
mkdir -p images

NID=6092354
BASE_DB=37468858  # dbCode for image N = BASE_DB + N
REFERER="https://pares.mcu.es/ParesBusquedas20/catalogo/show/${NID}"
COOKIES="cookies.txt"

# Refresh session cookie
curl -s -c "$COOKIES" -o /dev/null "$REFERER"

fail=0
for i in $(seq 1 426); do
  out=$(printf "images/%04d.jpg" "$i")
  if [[ -s "$out" ]] && file "$out" | grep -q JPEG; then
    continue
  fi
  db=$((BASE_DB + i))
  url="https://pares.mcu.es/ParesBusquedas20/ViewImage.do?accion=42&txt_descarga=1&dbCode=${db}&txt_id_imagen=${i}&txt_zoom=10&txt_contraste=0&txt_polarizado=&txt_brillo=10.0"
  if curl -sS -b "$COOKIES" -c "$COOKIES" -H "Referer: $REFERER" -o "$out" "$url" \
     && [[ -s "$out" ]] && file "$out" | grep -q JPEG; then
    printf "\r[%3d/426] ok" "$i"
  else
    printf "\n[%3d/426] FAIL\n" "$i"
    fail=$((fail + 1))
    rm -f "$out"
  fi
  sleep 0.4
done

printf "\nDone. Failures: %d\n" "$fail"
