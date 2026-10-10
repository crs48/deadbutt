"""Check generated internal links, fragments, local assets, headings, and duplicate IDs."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

root = Path('dist')
class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.ids=[]; self.links=[]; self.h1s=0; self.source=source
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if 'id' in attrs: self.ids.append(attrs['id'])
        if tag=='h1': self.h1s+=1
        for attr in ('href','src'):
            if attr in attrs: self.links.append(attrs[attr])

docs={}
for file in root.rglob('*.html'):
    doc=Document(file); doc.feed(file.read_text()); docs[file]=doc
errors=[]; checked=0
for file,doc in docs.items():
    if doc.h1s!=1: errors.append(f'{file}: {doc.h1s} h1 elements')
    if len(doc.ids)!=len(set(doc.ids)): errors.append(f'{file}: duplicate IDs')
    for link in doc.links:
        parsed=urlsplit(link)
        if parsed.scheme or parsed.netloc: continue
        if not parsed.path: target=file
        else:
            target=root / unquote(parsed.path).lstrip('/') if parsed.path.startswith('/') else file.parent / unquote(parsed.path)
            if target.is_dir(): target=target/'index.html'
        checked+=1
        if not target.exists(): errors.append(f'{file}: missing {link}')
        elif parsed.fragment and target in docs and unquote(parsed.fragment) not in docs[target].ids:
            errors.append(f'{file}: missing fragment {link}')
print(f'Checked {len(docs)} HTML documents and {checked} internal links/assets.')
if errors:
    print('\n'.join(errors)); raise SystemExit(1)
print('All links, fragments, headings, and IDs passed.')
