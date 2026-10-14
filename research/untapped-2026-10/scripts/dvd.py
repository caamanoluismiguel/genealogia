import json,sys,urllib.request,time,re,os
outdir=sys.argv[1]; files=sys.argv[2:]
os.makedirs(outdir,exist_ok=True)
seen=set()
for f in files:
    for r in json.load(open(f))['results']:
        i=r['id']
        if i in seen: continue
        seen.add(i)
        p=os.path.join(outdir,i+'.json')
        if not os.path.exists(p):
            req=urllib.request.Request(f"https://dataviva.archivogeneral.gov.co/api/resources/public/details/{i}",headers={"User-Agent":"Mozilla/5.0 genealogy research","Accept":"application/json"})
            open(p,'wb').write(urllib.request.urlopen(req,timeout=120).read()); time.sleep(2.5)
        d=json.load(open(p))
        print('=====',r.get('ident'),'| files:',r.get('files'),'| id',i)
        for fl in d.get('fields',[]):
            v=fl.get('value')
            if v in (None,'',[]): continue
            v=str(v)
            print(f"  {fl.get('label')}: {v[:1800]}")
        if d.get('parents'): print('  PARENTS:',' > '.join(p_.get('name','') for p_ in d['parents']))
