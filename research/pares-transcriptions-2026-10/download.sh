#!/usr/bin/env bash
# Download all page images of a PARES description (nid) into <outdir>/images/NNNN.jpg
# Usage: download.sh <nid> <outdir>
# Image->dbCode mapping is read from clickThumbnail(n, dbCode) in the viewer page (not sequential).
set -euo pipefail
NID=$1; OUT=$2
mkdir -p "$OUT/images"
B=https://pares.cultura.gob.es/ParesBusquedas20
CK="$OUT/cookies.txt"
curl -sSL -c "$CK" -o "$OUT/show.html" "$B/catalogo/show/$NID"
grep -o 'clickThumbnail([0-9]*, [0-9]*)' "$OUT/show.html" | sort -u | sed 's/clickThumbnail(\([0-9]*\), \([0-9]*\))/\1 \2/' | sort -n > "$OUT/map.txt"
echo "images: $(wc -l < "$OUT/map.txt")"
while read -r n db; do
  f=$(printf "%s/images/%04d.jpg" "$OUT" "$n")
  if [[ -s "$f" ]] && file "$f" | grep -q JPEG; then continue; fi
  curl -sS -b "$CK" -c "$CK" -H "Referer: $B/catalogo/show/$NID" -o "$f" \
    "$B/ViewImage.do?accion=42&txt_descarga=1&dbCode=$db&txt_id_imagen=$n&txt_zoom=10&txt_contraste=0&txt_polarizado=&txt_brillo=10.0"
  file "$f" | grep -q JPEG || { echo "FAIL $n"; rm -f "$f"; }
  sleep 0.5
done < "$OUT/map.txt"
echo done
