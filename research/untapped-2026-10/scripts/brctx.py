import json,sys,re,unicodedata,glob
def norm(s): return ''.join(c for c in unicodedata.normalize('NFD',s) if unicodedata.category(c)!='Mn').lower()
for p in sorted(glob.glob(sys.argv[1]+'/*.json')):
    d=json.load(open(p))
    txt=d.get('texto') if isinstance(d.get('texto'),str) else ''
    if not txt:
        txt=max((v for v in d.values() if isinstance(v,str)),key=len)
    n=norm(txt)
    print('#####',p.split('/')[-1],'|',d.get('title'),'|',d.get('date'))
    for m in re.finditer(r'c\s?a\s?a\s?m\s?a\s?n|camano\b|camanos',n):
        a=max(0,m.start()-int(sys.argv[2])); print('   ...',re.sub(r'\s+',' ',txt[a:m.start()+int(sys.argv[2])]),'...')
