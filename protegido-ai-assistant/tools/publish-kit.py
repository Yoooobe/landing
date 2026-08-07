"""Copia o kit, o contact sheet, os documentos e as peças para public/campanha/.

Roda depois de tools/contact-sheet.mjs e tools/publish-docs.mjs. Tudo que sai
daqui é gerado — editar sempre a origem no pacote, nunca public/campanha/.
"""
import os, re, shutil

PKG = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = '/Users/genautech/landing/public/campanha'
NOINDEX = '<meta name="robots" content="noindex,nofollow,noarchive,nosnippet">\n'

os.makedirs(DEST, exist_ok=True)

# ---- kit → index.html
kit = open(f'{PKG}/4unik_kit_conteudo_ago2026.html', encoding='utf-8').read()

# o arquivo histórico fica de fora da cópia pública: são rodadas reprovadas
# e 5,4 MB de imagens que o DNA atual não usa. Vira texto, sem link morto.
kit = re.sub(
    r'  <a href="_arquivo/4unik_content_presentation\.html">ideação inicial</a> ·\n'
    r'  <a href="_arquivo/4unik_ab_test_presentation\.html">teste A/B</a> ·\n'
    r'  <a href="_arquivo/4unik_final_compositions\.html">composições A/B</a>\.',
    '  ideação inicial, teste A/B e composições A/B — só no repositório, fora desta página.',
    kit)
kit = kit.replace(
    'em <code>_arquivo/</code>, rodadas anteriores à releitura do DNA, mantidas só como registro. Nada delas vai para produção:',
    'em <code>_arquivo/</code> no repositório, rodadas anteriores à releitura do DNA, mantidas só como registro. Nada delas vai para produção:')

# link para o contact sheet, que agora mora ao lado
kit = kit.replace(
    '<a href="#producao">Produção</a>',
    '<a href="#producao">Produção</a>\n    <a href="contact-sheet.html">Peças</a>')

kit = kit.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n' + NOINDEX, 1)
open(f'{DEST}/index.html', 'w', encoding='utf-8').write(kit)

# ---- peças: PNG e MP4 de verdade, para o contact sheet abrir em tamanho real
#      e tocar os Reels no navegador.
PECAS = f'{DEST}/pecas'
shutil.rmtree(PECAS, ignore_errors=True)
mb = 0
for d in sorted(os.listdir(f'{PKG}/entregas')):
    src = f'{PKG}/entregas/{d}'
    if not (d.startswith('2026-') and os.path.isdir(src)):
        continue
    os.makedirs(f'{PECAS}/{d}', exist_ok=True)
    for f in sorted(os.listdir(src)):
        if f.endswith(('.png', '.mp4')):
            shutil.copy2(f'{src}/{f}', f'{PECAS}/{d}/{f}')
            mb += os.path.getsize(f'{src}/{f}')

# ---- contact sheet
cs = open(f'{PKG}/entregas/CONTACT-SHEET.html', encoding='utf-8').read()
cs = cs.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + NOINDEX, 1)
cs = cs.replace('href="../4unik_kit_conteudo_ago2026.html"', 'href="./"')
cs = cs.replace('href="2026-', 'href="pecas/2026-').replace('src="2026-', 'src="pecas/2026-')
open(f'{DEST}/contact-sheet.html', 'w', encoding='utf-8').write(cs)

# ---- documentos: os .md renderizados, com o .md original embutido em cada página
DOCS = f'{DEST}/docs'
shutil.rmtree(DOCS, ignore_errors=True)
os.makedirs(DOCS, exist_ok=True)
docs_kb = 0
for f in sorted(os.listdir(f'{PKG}/docs')):
    if not f.endswith('.html'):
        continue
    h = open(f'{PKG}/docs/{f}', encoding='utf-8').read()
    # o noindex já sai de publish-docs.mjs; aqui só o nav muda de endereço
    # no pacote o nav aponta para os nomes de arquivo reais; aqui eles são outros
    h = h.replace('href="../4unik_kit_conteudo_ago2026.html"', 'href="../"')
    h = h.replace('href="../entregas/CONTACT-SHEET.html"', 'href="../contact-sheet.html"')
    open(f'{DOCS}/{f}', 'w', encoding='utf-8').write(h)
    docs_kb += os.path.getsize(f'{DOCS}/{f}')

for f in sorted(os.listdir(DEST)):
    p = f'{DEST}/{f}'
    if os.path.isfile(p):
        print(f'{f:22} {os.path.getsize(p)/1024:>8.0f} KB')
print(f'{"docs/":22} {docs_kb/1024:>8.0f} KB · {len(os.listdir(DOCS))} páginas')
print(f'{"pecas/":22} {mb/1024/1024:>8.1f} MB')
