#!/bin/bash
out=$1; shift
for q in "$@"; do
 slug=$(echo "$q" | tr -c 'A-Za-z0-9' '_' | cut -c1-80); f="$out/fts-$slug.json"
 [ -s "$f" ] || { curl -s --max-time 90 -G "https://archive.org/services/search/beta/page_production/" --data-urlencode "user_query=$q" --data-urlencode 'service_backend=fts' --data-urlencode 'hits_per_page=50' --data-urlencode 'page_type=collection_details' --data-urlencode 'page_target=texts' -o "$f"; sleep 4; }
 python3 -I -c "
import json,sys,re,html
d=json.load(open(sys.argv[1])); r=d.get('response',{}); b=r.get('body') or {}
if not b: print(sys.argv[2],'ERR',r.get('errors')); sys.exit()
h=b.get('hits',{}); print('===',sys.argv[2],'total',h.get('total'))
for x in h.get('hits',[]):
  f=x.get('fields',{}); hl=x.get('highlight') or {}
  s=' || '.join(hl.get('text',[])[:2]) if isinstance(hl,dict) else ''
  s=re.sub(r'\s+',' ',html.unescape(re.sub(r'</?(mark|em)>','*',s)))
  print(' -',f.get('identifier'),'|',str(f.get('title'))[:70],'|',f.get('date') or f.get('year'),'||',s[:300])
" "$f" "$q"
done
