import json,sys,urllib.request,time
PT=["agrupación","agrupación-documental","archivo","caja","carpeta","documento","expediente","fondo","grupo","legajo","libro","mapa","n/a","protocolo","sección","serie","sub-fondo","subsección","subserie","tomo","transferencia","unidad-de-conservación","unidad-conservacion-caja","unidad-conservacion-carpeta","unidad-documental","unidad-documental-documento","unidad-documental-expediente","unidad-documental-compuesta"]
def search(kw,root,page=0,limit=50):
    body={"post_type":PT,"status":"published","page":page,"limit":limit,"sortBy":"ident","sortOrder":"asc","keyword":kw,"activeFilters":[],"date_filters":[],"input_filters":[]}
    if root: body["root"]={"id":root}
    req=urllib.request.Request("https://dataviva.archivogeneral.gov.co/api/search/public",data=json.dumps(body).encode(),headers={"Content-Type":"application/json","Accept":"application/json","User-Agent":"Mozilla/5.0 genealogy research"})
    return json.load(urllib.request.urlopen(req,timeout=120))
if __name__=="__main__":
    kw=sys.argv[1]; root=sys.argv[2] if len(sys.argv)>2 and sys.argv[2]!='-' else None; out=sys.argv[3]
    allr=[];page=0
    while True:
        d=search(kw,root,page)
        res=d.get('results') or d.get('resources') or []
        allr+=res
        if page==0: print(kw,'total',d.get('total'),'keys',[k for k in d if k!='query'])
        if not d.get('has_next') or page>=10: break
        page+=1; time.sleep(3)
    json.dump({"keyword":kw,"root":root,"total":d.get('total'),"results":allr},open(out,'w'),ensure_ascii=False,indent=1)
    for r in allr[:60]:
        md=(r.get('metadata') or {}).get('firstLevel',{}) if 'metadata' in r else r.get('_source',{}).get('metadata',{}).get('firstLevel',{})
        tc=md.get('temporalCoverage') or {}
        print(' ',r.get('ident') or r.get('_source',{}).get('ident'),'|',(md.get('title') or '')[:150],'|',str(tc.get('start'))[:4],str(tc.get('end'))[:4])
