# FRAMEWORKS — uso na 4Unik

> Estes frameworks são métodos de produção (Human Academy / Agent Lab).
> **Toda saída deve ser adaptada ao DNA da 4Unik**
> (`../dna/4unik-*.md`). Não use exemplos de outras marcas.

---

SOMENTE LEITURA — Pipelines e frameworks do Agent Lab 3 (Human Academy). Referência de método de produção. O agente NÃO grava nesta pasta.

---

# Human Agent Lab

Este repositorio e a casa dos sistemas Human no Claude Code.

Ele existe para uma coisa bem pratica: manter todos os nossos agentes, skills, comandos e manuais no mesmo lugar, com um mapa claro do que cada pasta faz e como cada sistema deve ser usado. Este README e o nosso ponto de referencia para os proximos desenvolvimentos. Quando a gente ficar em duvida sobre o norte do projeto, volta aqui.

Hoje o projeto junta sete produtos independentes, cada um com uma pasta propria, um comando principal e uma forma de uso especifica:

- `/image` — Human Image
- `/product` — Human Cinematic
- `/dna` — Human DNA
- `/carrossel` — Human Carrossel
- `/social` — Human Social
- `/desdobrar` — alias do Human Social
- `/team` — Human Team
- `/motion` — Human Motion
- `/instalar` — modo Skill-Factory: cria e instala cada produto como skill autocontida em `~/.claude/skills/`

O objetivo e ensinar, operar e evoluir essas skills dentro do Claude Code, com compatibilidade para Mac e Windows. Quando um produto precisar de Cloud Routines, Routines locais, conectores, Notion, Drive, Higgsfield CLI ou OpenSquad, isso faz parte da arquitetura oficial daquele produto.

Premissa atual de geracao visual: **Higgsfield CLI e a base principal para imagens, videos, materiais e pecas.** Toda imagem, still, frame, thumbnail, product shot, asset visual, carrossel renderizado ou anuncio estatico gerado por IA usa **Nano Banana 2** (`nano_banana_2`) pelo Higgsfield CLI. Antes de gerar, a skill precisa definir projeto, quantidade, aspect ratio/formato, resolucao, referencias, objetivo e pasta de output.

## O norte do projeto

A ideia central e simples: o usuario chama um comando, e o projeto carrega a inteligencia certa.

O usuario nao precisa saber qual arquivo abrir, qual prompt colar ou qual pasta tecnica consultar. O comando certo deve levar o agente para o sistema certo.

Este repositorio tambem e uma base de treinamento. Entao cada pasta precisa ser compreensivel para quem esta aprendendo:

- o que esse sistema faz;
- quando usar;
- que comando chama;
- quais arquivos explicam a logica;
- que resultado sai no final;
- quais ferramentas podem ser necessarias;
- como estudar sem se perder.

## Base OpenSquad

Parte importante deste projeto vem da logica do OpenSquad: agentes especializados, squads, pipelines, skills, memoria, checkpoints e execucao por etapas.

O `Human Team` e a expressao mais direta disso, porque ele usa OpenSquad como estrutura principal. Mas a filosofia aparece no projeto inteiro:

- cada produto e quase uma skill independente;
- cada pasta tem um papel claro;
- cada comando funciona como porta de entrada;
- o agente deve carregar o contexto certo antes de agir;
- outputs precisam ser rastreaveis;
- decisoes importantes passam por aprovacao humana quando necessario.

Com o tempo, a gente vai melhorar e padronizar essa base. Por enquanto, este README registra o estado atual para nao perdermos o fio.

## Regra de manutencao deste README

Este README e o manual vivo do projeto. Sempre que uma pasta mudar, um comando novo for criado, uma dependencia for adicionada, uma rotina mudar ou um fluxo de uso for alterado, este arquivo precisa ser atualizado no mesmo commit.

Nao trate este README como resumo de marketing. Ele deve explicar de forma operacional:

- o que cada pasta faz;
- como usar cada pasta;
- quais comandos existem;
- quais arquivos principais estudar;
- quais resultados esperar;
- quais dependencias/configuracoes podem aparecer;
- quais boas praticas seguir ao estudar ou operar o sistema.

## Como usar na raiz do projeto

Abra o Claude Code nesta pasta raiz e chame um dos comandos:

```text
/image
/product
/dna
/carrossel
/social
/desdobrar
/team
/motion
```

Tambem da para escrever em linguagem natural. O orquestrador em `CLAUDE.md` tenta rotear o pedido para o produto certo.

Exemplos:

```text
/image cria um prompt para uma foto editorial de produto skincare
/product product shot impossivel para um tenis de corrida
/dna criar DNA criativo para uma marca nova
/carrossel configurar um sistema diario de noticias para Instagram
/social /caminho/da/pasta-com-texto-e-imagens
/desdobrar /caminho/da/pasta-com-texto-e-imagens
/team tenho uma ideia de reel e quero transformar em campanha publicavel
/motion crie um Reel de motion graphics de 15s pelo terminal
/instalar
```

## Como instalar para usar em qualquer pasta

> **Caminho oficial = modo Skill-Factory.** A instalacao das skills e feita pelo proprio
> Claude: na raiz, rode `/instalar` (ou peca "transformar tudo em skill"). O orquestrador
> le cada produto, espera seu OK e instala cada um como skill autocontida em
> `~/.claude/skills/`. Procedimento: `.claude/skill-factory.md`.
>
> Os instaladores `install/install.sh`, `install/install.ps1` e
> `install/install-global-commands.py` estao **aposentados**. Os "Passos 1-5" abaixo
> permanecem apenas como **preparo de ambiente** (Git, Node, Python, Claude Code,
> Higgsfield CLI) para quem esta montando a maquina do zero — eles nao sao mais o caminho
> de instalacao das skills.

### Jeito mais simples dentro do Claude Code

Se voce ja esta com este projeto aberto no Claude Code, rode:

```text
/instalar
```

Esse comando entra no **modo Skill-Factory**: le cada produto e, com seu OK, cria e instala uma skill autocontida em:

- macOS/Linux: `~/.claude/skills/{nome}/`
- Windows: `%USERPROFILE%\.claude\skills\{nome}\`

Cada skill carrega toda a inteligencia da pasta de origem para dentro de si — funciona em qualquer projeto sem depender deste repo nem de variaveis de ambiente. Depois de instalar, abra uma nova sessao do Claude Code em qualquer pasta e descreva a intencao (ex.: "cria uma imagem editorial de perfume"); a skill correspondente e acionada sozinha.

Os outputs das execucoes nascem no projeto atual, em:

```text
human-output/
  image/
  product/
  motion/
  team/
  carrossel/
```

### Passo 1 - Baixar ou clonar o projeto

O jeito mais simples e rodar o instalador direto da URL hospedada. Nesse modo, ele baixa/clona o projeto sozinho.

Escolha o comando do seu sistema:

| Sistema | Comando |
|---|---|
| macOS | `bash -c "$(curl -fsSL URL_DO_INSTALL/install.sh)"` |
| Windows 10/11 | `irm URL_DO_INSTALL/install.ps1 \| iex` |
| Windows 7/8 ou PowerShell antigo | `powershell -ExecutionPolicy Bypass -Command "iex ((New-Object Net.WebClient).DownloadString('URL_DO_INSTALL/install.ps1'))"` |

macOS:

```bash
bash -c "$(curl -fsSL URL_DO_INSTALL/install.sh)"
```

Windows 10/11:

```powershell
irm URL_DO_INSTALL/install.ps1 | iex
```

Windows 7/8 ou PowerShell antigo:

```powershell
powershell -ExecutionPolicy Bypass -Command "iex ((New-Object Net.WebClient).DownloadString('URL_DO_INSTALL/install.ps1'))"
```

Se voce ja baixou o projeto manualmente, coloque esta pasta em um lugar fixo do computador. Exemplo:

```text
Documents/ClaudeProjects/agentlab
```

Evite instalar dentro de uma pasta temporaria, porque os comandos globais vao apontar para este caminho.

### Passo 2 - Abrir o terminal na pasta do projeto

No Mac, abra o Terminal.

No Windows, abra o PowerShell.

Entre na pasta onde o projeto esta salvo. Exemplo:

```bash
cd Documents/ClaudeProjects/agentlab
```

### Passo 3 - Rodar o instalador

No Mac:

```bash
bash install/install.sh
```

No Windows:

```powershell
powershell -ExecutionPolicy Bypass -File install/install.ps1
```

Se o Windows perguntar permissao para instalar Git, Node ou outro pacote, aceite. Em maquinas sem `winget`, pode ser necessario abrir o PowerShell como Administrador para o instalador configurar Chocolatey.

No Mac, se o sistema pedir senha, digite a senha do proprio computador. E normal que nada apareca na tela enquanto voce digita; por seguranca, o macOS nao mostra os caracteres.

### Passo 4 - Reiniciar o terminal

Depois que o instalador terminar, feche e abra o terminal de novo.

No Windows, normalmente basta fechar e abrir o PowerShell de novo.

### Passo 5 - Testar no Claude Code

Depois da instalacao, o navegador abre automaticamente na pagina do hands-on.

O instalador prepara a maquina do zero quando for preciso:

- baixa/clona o Human Agent Lab se estiver rodando direto da URL;
- instala Git, se nao estiver instalado;
- instala Node.js/npm, se nao estiver instalado;
- instala Python/pip, se nao estiver instalado;
- instala Claude Code pelo instalador nativo oficial quando possivel e usa npm como fallback;
- instala Higgsfield CLI via npm;
- instala globalmente o criador do Remotion (`create-video@latest`), sem criar projeto durante a instalacao;
- tenta instalar Claude Desktop quando o sistema permite;
- abre login do Claude Code e Higgsfield quando ainda nao estiverem conectados, mas nao bloqueia o fim da instalacao por padrao;
- cria os comandos globais em `~/.claude/commands` no Mac ou `%USERPROFILE%\.claude\commands` no Windows, incluindo `/instalar`;
- registra `HUMAN_AGENT_LAB_HOME`, apontando para esta pasta do projeto.
- registra `HIGGSFIELD_IMAGE_MODEL=nano_banana_2`, modelo obrigatório de imagem.
- abre `https://agent.humanacademy.ai/install?step=1&next=claude-desktop&sync=1` no navegador ao finalizar.

Ele tambem tenta corrigir os problemas mais comuns de ambiente: Homebrew instalado fora do PATH no Mac, PATH desatualizado no Windows, Git/Node instalados mas invisiveis no terminal, Python sem pip, Git Bash do Claude Code no Windows e npm global sem expor `claude` ou `higgsfield`.

O instalador tambem abre com um banner ANSI da Human para deixar claro para o aluno que o setup certo esta rodando.

Compatibilidade real: macOS 13+, Windows 10 build 1809+ e Windows 11 sao o caminho integral para Claude Code. Windows 7 e Windows 8 entram como melhor esforco, porque Node, Python, Claude Desktop, Claude Code e Higgsfield podem limitar suporte nessas versoes antigas.

Depois disso, o usuario pode chamar em qualquer pasta:

```text
/image
/product
/dna
/carrossel
/social
/desdobrar
/team
/motion
```

O instalador nao grava `ANTHROPIC_API_KEY`, `HIGGSFIELD_API_KEY`, `OPENAI_API_KEY`, tokens ou qualquer credencial no ambiente do usuario. Se alguma ferramenta exigir autenticacao, o usuario passa pelo login oficial da propria ferramenta.

Guia detalhado e troubleshooting: `install/README.md`.

## Arquitetura da raiz

| Arquivo/Pasta | Funcao |
|---|---|
| `CLAUDE.md` | Orquestrador raiz. Define os comandos canonicos e as regras de roteamento. |
| `.claude/commands/` | Comandos slash disponiveis na raiz do Claude Code. |
| `Human Images/` | Human Image. |
| `Human Cinematic/` | Human Cinematic. |
| `Human DNA/` | Human DNA. |
| `Human Carroussel/` | Human Carrossel. |
| `Human Social/` | Human Social. |
| `Human Team/` | Human Team. |
| `Human Motion/` | Human Motion. |

## Comandos disponiveis

| Comando | Produto | Pasta | Uso principal |
|---|---|---|---|
| `/image` | Human Image | `Human Images/` | Criar prompts cinematograficos para imagem. |
| `/product` | Human Cinematic | `Human Cinematic/` | Criar product shots, campanhas, roteiros, frames, stills e videos cinematicos. |
| `/dna` | Human DNA | `Human DNA/` | Criar, editar, auditar e usar DNA Criativo de marca. |
| `/carrossel` | Human Carrossel | `Human Carroussel/` | Configurar e operar News-to-Carrossel com Routines, Notion e render. |
| `/social` | Human Social | `Human Social/` | Desdobrar pasta com texto + imagens em pecas para Instagram e LinkedIn. |
| `/desdobrar` | Human Social | `Human Social/` | Alias direto do fluxo de desdobramento social. |
| `/team` | Human Team | `Human Team/` | Acionar Time de Agentes Criativos multiagente. |
| `/motion` | Human Motion | `Human Motion/` | Criar e editar Reels/motion graphics pelo terminal com Remotion. |
| `/instalar` | Skill-Factory | `.claude/skill-factory.md` | Ler cada produto e criar/instalar como skill autocontida em `~/.claude/skills/`. |

## Comandos internos e aliases importantes

Os comandos acima sao os comandos canonicos da raiz. Algumas pastas tambem ja trazem comandos internos ou formas de chamada herdadas:

| Comando | Onde vive | Observacao |
|---|---|---|
| `/desdobrar` | `Human Social/.claude/skills/desdobrar/SKILL.md` | Comando original do Human Social. Na raiz e na instalacao global, `/social` e `/desdobrar` encaminham para esse fluxo. |
| `/opensquad` | `Human Team/.claude/skills/opensquad/SKILL.md` | Comando original do OpenSquad. Na raiz, `/team` usa a squad criativa padrao sem abrir menu generico. |
| `/team` | `Human Team/.claude/commands/team.md` | Comando direto do Time de Agentes Criativos. |
| `ajuda` / `/help` | Principalmente `Human DNA` e `Human Team` | Usado para orientar quando o usuario estiver perdido no fluxo. |

Regra: na raiz do projeto, a gente prioriza os comandos canonicos. O `/desdobrar` tambem pode ser usado diretamente porque e um alias publico do Human Social.

## Human Images

Pasta: `Human Images/`

Comando:

```text
/image
```

### O que faz

Human Image e um sistema de direcao fotografica com render direto. Ele transforma uma ideia curta, uma referencia visual ou uma descricao simples em prompt cinematografico de alto nivel e gera a imagem final via Higgsfield CLI + Nano Banana 2 (`nano_banana_2`).

O fluxo oficial de geracao e sempre Nano Banana 2 pelo Higgsfield CLI. Outros formatos podem aparecer apenas como referencia conceitual/export de prompt quando o usuario pedir somente texto, nunca como render principal do treinamento.

### Arquivos principais

| Arquivo | Funcao |
|---|---|
| `Human Images/imageprompts.md` | Guia completo de prompt visual: camera, lente, luz, textura, composicao e formatos de saida. |
| `Human Images/scripts/render_image.py` | Helper para validar Higgsfield CLI, renderizar e baixar a imagem final. |
| `Human Images/output/` | Pasta padrao para prompts, metadados e imagens geradas. |
| `.claude/commands/image.md` | Comando raiz que ativa o Human Image. |

### Como usar

No Claude Code, na raiz:

```text
/image crie uma foto editorial de um perfume em luz noturna
```

O agente deve perguntar o que faltar para render:

- aspect ratio: `auto`, `1:1`, `3:2`, `2:3`, `4:3`, `3:4`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`;
- tamanho: `1k`, `2k` ou `4k`.

Padrao recomendado: `2k`. Use `4k` apenas quando o usuario pedir explicitamente ou quando a entrega exigir grande detalhe.

Com imagem de referencia, envie ou aponte a imagem e peça:

```text
/image transformar esta referencia em uma imagem nova 4:5 em 2k
```

### Resultado esperado

Uma imagem renderizada via Higgsfield CLI em `Human Images/output/{run_id}/`, acompanhada do prompt final usado e metadados de geracao.

O prompt ainda deve ter decisoes fisicas de fotografia:

- camera;
- lente;
- luz;
- sujeito;
- foreground/midground/background;
- textura de pele/material;
- comportamento tonal;
- composicao;
- direcao de arte;
- aspect ratio;
- tamanho/resolucao.

### Boas praticas para estudar

1. Leia primeiro as secoes `IDENTIDADE`, `PRINCIPIOS` e `FORMATO DE ENTREGA`.
2. Compare prompts bons e ruins observando se descrevem fisica visual em vez de adjetivos vagos.
3. Treine com o mesmo briefing em tres looks diferentes: comercial, documental e terror.
4. Nao pule o checklist interno antes de renderizar.
5. Sempre confirme aspect ratio e tamanho quando o usuario nao informar.

## Human Cinematic

Pasta: `Human Cinematic/`

Comando:

```text
/product
```

### O que faz

Human Cinematic e o sistema de producao cinematografica. Ele conduz o usuario da ideia ate uma campanha com roteiro, referencias, personagens, character sheets, frames aprovados e videos gerados via Higgsfield.

Ele usa Claude Code como operador criativo e tecnico. O usuario conversa em portugues; o agente organiza os arquivos e prepara os prompts.

### Arquivos principais

| Arquivo/Pasta | Funcao |
|---|---|
| `Human Cinematic/CLAUDE.md` | Regras centrais do agente Human Cinematic. |
| `Human Cinematic/COMECE-AQUI.md` | Manual operacional principal para criar campanhas, refs, frames e videos. |
| `Human Cinematic/PRODUCT-SHOTS.md` | Fluxo de product shots premium com Visual Intent, iteracao, inpainting/refinamento e polish final. |
| `Human Cinematic/SCRIPT_AI_SYSTEM.md` | Sistema de roteiro para criar/lapidar historia antes da campanha. |
| `Human Cinematic/seedance-prompt-framework.md` | Framework de prompts de imagem/video, com Seedance em chines e Nano Banana 2 em ingles. |
| `Human Cinematic/_template/` | Template-base para campanhas novas. |
| `Human Cinematic/campaigns/` | Onde campanhas reais vivem. |
| `.claude/commands/product.md` | Comando raiz que ativa o Human Cinematic. |

### Como usar

Na raiz:

```text
/product quero criar uma campanha cinematografica para um produto
```

Ou:

```text
/product quero fazer um curta de 30 segundos mas ainda nao tenho roteiro
```

Para Product Shots:

```text
/product product shot impossivel de um perfume artesanal para anuncio 4:5
```

Ou de forma natural:

```text
/product preciso de uma serie de fotos profissionais para vender este produto
```

O agente deve:

1. detectar se o pedido e Product Shots Impossiveis, campanha, roteiro, imagem, video ou status;
2. em Product Shots, rodar Visual Intent -> geracao/iteracao/inpainting -> polish final;
3. em campanha/video, detectar se o usuario tem roteiro ou precisa do Script AI;
4. criar campanha em `campaigns/{nome}/`;
5. organizar referencias em `internal/`;
6. gerar character sheets quando houver personagem recorrente;
7. gerar um frame por cena;
8. pedir aprovacao;
9. so entao gerar videos.

### Resultado esperado

Uma campanha estruturada com:

- `internal/` para handoff, referencias, UUIDs, descritores, logs e feedback;
- `output/` para resultados limpos e numerados;
- character sheets aprovados;
- frames por cena aprovados;
- prompts e videos gerados com continuidade.

No modo **Product Shots**, o resultado esperado e:

- Visual Intent em portugues, extraido do briefing;
- criterio "R$15 mil em estudio" traduzido em direcao de arte, luz, set, materiais e acabamento;
- serie de product shots profissionais, normalmente com hero impossivel, detalhe/material, contexto de desejo e anuncio estatico;
- prompts em ingles para Nano Banana 2;
- geracao via Higgsfield CLI quando o usuario pedir render real;
- iteracao/inpainting por refinamento referenciado;
- polish final com upscale, micro-refinamentos e checklist de fidelidade do produto.

### Dependencias possiveis

- Claude Code;
- Node/npm;
- Higgsfield CLI;
- login Higgsfield;
- modelos Higgsfield como Seedance, Nano Banana 2 e Kling.

### Boas praticas para estudar

1. Comece por `COMECE-AQUI.md`, nao pelo manual tecnico antigo.
2. Para Product Shots, leia `PRODUCT-SHOTS.md` e pratique uma serie com 4 imagens.
3. Entenda a regra mais importante: video so depois de frames aprovados.
4. Estude a separacao `internal/` vs `output/`.
5. Leia o `seedance-prompt-framework.md` para entender idioma de entrega, ref stack e limites.
6. Estude o Script AI separadamente como modulo de roteiro.

## Human DNA

Pasta: `Human DNA/`

Comando:

```text
/dna
```

### O que faz

Human DNA cria o DNA Criativo de uma marca: um arquivo `DNA.md` que documenta identidade visual, tom de voz, estrategia, comportamento, audiencia, anti-padroes, fotografia, ferramentas e aplicacoes. Ele tambem gera um `CLAUDE.md` do projeto para o Claude Code ler esse DNA e seguir o estilo sempre.

Ele e multi-projeto: cada marca vive dentro de `Human DNA/projetos/{slug}/`.

### Arquivos principais

| Arquivo/Pasta | Funcao |
|---|---|
| `Human DNA/CLAUDE.md` | Maestro do DNA Criativo: regras de tom, fluxo, projetos e entregavel. |
| `Human DNA/👋 COMECE-AQUI.md` | Guia humano para iniciar no Claude Code. |
| `Human DNA/inteligencias/01-DNA-Master.md` | Template canonico do `DNA.md`. |
| `Human DNA/inteligencias/_template/CLAUDE.md` | Template personalizado para o `CLAUDE.md` de cada projeto. |
| `Human DNA/inteligencias/05-13*.md` | Doutores de estrategia, audiencia, voz, visual, fotografia, imagem, comportamento, anti-padroes e referencias. |
| `Human DNA/inteligencias/15-R2-DNA-Routine-Local.md` | Routine para uso avancado/automacao do DNA. |
| `Human DNA/projetos/` | Container de marcas. |
| `.claude/commands/dna.md` | Comando raiz que ativa o Human DNA. |

### Como usar

Na raiz:

```text
/dna
```

O agente deve:

1. listar projetos existentes em `Human DNA/projetos/`;
2. perguntar qual abrir ou criar novo;
3. criar estrutura a partir do template se for novo;
4. conduzir o briefing uma pergunta por vez;
5. salvar progresso;
6. gerar `dna-criativo/DNA.md`;
7. gerar `CLAUDE.md` na raiz do projeto;
8. testar uma peça pequena seguindo o DNA;
9. refinar com feedback em tempo real ou registrar confirmação de aderência;
10. revisar se o DNA, o teste e o refino estao coerentes;
11. usar o DNA pronto para gerar, auditar ou editar materiais.

### Resultado esperado

Para cada marca:

```text
Human DNA/projetos/{slug}/
├── CLAUDE.md
├── materiais/
├── dna-criativo/
│   └── DNA.md
├── .brand.json
└── outros arquivos de estado quando necessario
```

Os entregaveis principais sao:

```text
dna-criativo/DNA.md
CLAUDE.md
```

O usuario conclui o fluxo com uma peça de teste gerada e, se necessário, uma rodada de refino aplicada ao DNA.

### Dependencias possiveis

- Claude Code para o fluxo principal;
- Notion/Drive como conectores opcionais ou oficiais quando houver sincronizacao/automacao;
- Cloud/Local Routines quando o projeto exigir automacao recorrente;
- Higgsfield CLI quando o uso envolver geracao de imagem ou video.

### Boas praticas para estudar

1. Leia `CLAUDE.md` inteiro antes de operar.
2. Entenda a regra: uma pergunta por mensagem.
3. Estude `01-DNA-Master.md` para saber a profundidade esperada do entregavel.
4. Leia os doutores `05-13` por disciplina, nao todos de uma vez sem contexto.
5. Teste primeiro criando uma marca pequena antes de tentar um DNA completo.

## Human Carrossel

Pasta: `Human Carroussel/`

Comando:

```text
/carrossel
```

### O que faz

Human Carrossel cria carrosseis Instagram em escala. Ele funciona tanto sob demanda, a partir de um tema simples ou conteudo proprio, quanto de forma automatizada, monitorando noticias, selecionando pauta, criando headline, estruturando espinha dorsal, gerando copy de slides e renderizando com coerencia editorial e visual.

Ele usa R1 e R2:

- R1 — News Scout: coleta noticias.
- R2 — Carousel Creator: escolhe noticia, escreve carrossel e renderiza slides.

Quando a entrada vem de uma frase simples, o proprio agente faz a pesquisa, escolhe o angulo editorial e cria a estrutura. O usuario nao precisa saber escrever briefing.

Cloud Routines e Routines locais fazem parte da arquitetura deste produto.

### Arquivos principais

| Arquivo | Funcao |
|---|---|
| `Human Carroussel/00-README.md` | Visao geral do sistema. |
| `Human Carroussel/02-Setup-Wizard.md` | Wizard inicial de identidade, fontes e Routines. |
| `Human Carroussel/03-Notion-template.md` | Estrutura Notion criada pelo setup. |
| `Human Carroussel/05-Manual-Editorial.md` | Regras editoriais e anti-AI-slop. |
| `Human Carroussel/06-Engine-de-Headlines.md` | Motor de headlines. |
| `Human Carroussel/07-Espinha-Dorsal.md` | Estrutura de slides. |
| `Human Carroussel/08-Design-System.md` | Sistema visual. |
| `Human Carroussel/09-Render-Engine.md` | Render via Higgsfield CLI. |
| `Human Carroussel/12-R1-News-Scout.md` | Prompt/config da Routine R1. |
| `Human Carroussel/13-R2-Routine-Local.md` | Prompt/config da Routine R2. |
| `Human Carroussel/14-Input-Proprio.md` | Carrossel sob demanda a partir de tema simples, texto colado ou conteudo proprio. |
| `Human Carroussel/15-Como-usar.md` | Uso diario, rerender, trocar noticia, ajustar slide. |
| `Human Carroussel/16-Troubleshooting.md` | Diagnostico de erros. |
| `.claude/commands/carrossel.md` | Comando raiz que ativa o Human Carrossel. |

### Como usar

Na raiz:

```text
/carrossel configurar uma nova marca
```

Ou:

```text
/carrossel quero um carrossel sobre bicicletas eletricas em Sao Paulo
```

Ou:

```text
/carrossel re-render do carrossel de hoje
```

Ou:

```text
/carrossel trocar a noticia escolhida para a noticia 12
```

### Resultado esperado

Um sistema configurado com:

- paginas/databases no Notion;
- R1 Cloud/Remote Routine para noticias;
- R2 Local Routine para criacao/render;
- modo sob demanda para tema simples ou conteudo proprio;
- pasta local de estado;
- slides gerados;
- registro no Notion;
- backup/saida quando configurado.

### Dependencias possiveis

- Claude Code para setup/guias;
- Cloud Routines e Local Routines;
- Notion;
- Google Drive;
- Higgsfield CLI;
- conectores oficiais;
- acesso web para pesquisa de noticias.

### Boas praticas para estudar

1. Leia `00-README.md` para entender arquitetura.
2. Estude `02-Setup-Wizard.md` antes de tentar configurar.
3. Leia `05`, `06` e `07` para entender por que o texto funciona.
4. Leia `09-Render-Engine.md` para entender o render visual.
5. Use `15-Como-usar.md` para operar depois que estiver instalado.
6. Quando algo sair ruim, edite a fonte de verdade: Notion/docs, nao apenas o prompt da Routine.

## Human Social

Pasta: `Human Social/`

Comando:

```text
/social
```

Comando interno existente:

```text
/desdobrar
```

### O que faz

Human Social pega uma pasta com texto + imagens e gera pecas nativas para:

- Instagram Feed;
- Instagram Stories;
- LinkedIn Feed.

Ele nao faz apenas resize. Ele cria novas imagens por plataforma, com chain de referencia e legenda propria para cada rede.

### Arquivos principais

| Arquivo/Pasta | Funcao |
|---|---|
| `Human Social/CLAUDE.md` | Visao geral da skill de desdobramento. |
| `Human Social/.claude/skills/desdobrar/SKILL.md` | Pipeline completo da skill. |
| `Human Social/scripts/desdobrar.py` | Infra Python para validar chave, preparar pasta, gerar e baixar assets. |
| `Human Social/origem/` | Exemplo de entrada e saida gerada. |
| `.claude/commands/social.md` | Comando raiz que ativa o Human Social. |
| `.claude/commands/desdobrar.md` | Alias direto para o mesmo fluxo. |

### Como usar

Crie ou escolha uma pasta com:

- 1 arquivo `.txt` com legenda/briefing;
- 1 ou mais imagens `.png`, `.jpg`, `.jpeg` ou `.webp`.

Depois, na raiz:

```text
/social /caminho/da/pasta
```

Ou, pelo alias direto:

```text
/desdobrar /caminho/da/pasta
```

No Mac, o usuario pode arrastar a pasta para o chat. No Windows, pode colar o caminho do Explorer.

Esse fluxo tambem pode ser chamado dentro de outra skill. Se voce estiver em `/team`, `/product`, `/carrossel` ou qualquer outro comando e pedir para "desdobrar esse material para redes sociais", o orquestrador deve carregar o Human Social como subfluxo compartilhado.

### Resultado esperado

Saida em:

```text
<pasta>/desdobramento/
├── instagram-feed.png
├── instagram-feed.txt
├── instagram-stories/
│   ├── story-01.png
│   ├── story-02.png
│   └── roteiro.txt
├── linkedin-feed.png
├── linkedin-feed.txt
└── manifest.json
```

### Dependencias possiveis

- Claude Code;
- Python;
- Higgsfield CLI;
- login Higgsfield validado pelo fluxo conversacional da skill.

### Boas praticas para estudar

1. Leia `CLAUDE.md` para entender a proposta.
2. Leia o `SKILL.md` para entender os passos do pipeline.
3. Rode primeiro com a pasta `origem/` como referencia de formato.
4. Compare as diferencas entre IG Feed, Stories e LinkedIn. O valor esta na adaptacao nativa, nao no resize.
5. Observe o `manifest.json` para entender rastreabilidade.

## Human Team

Pasta: `Human Team/`

Comando:

```text
/team
```

Comando interno existente:

```text
/opensquad
```

### O que faz

Human Team e o Time de Agentes Criativos. Ele usa OpenSquad para transformar uma ideia, referencia ou material existente em uma producao criativa estruturada.

Ele pode criar:

- brief;
- plano;
- dossie;
- projeto de campanha;
- conceito;
- roteiro;
- direcao de arte;
- storyboard;
- folha de producao;
- imagens teaser, principais e secundarias;
- anuncios em 9:16, 4:5 e 16:9;
- copy-pack de campanha, posts, anuncios, e-mails e voiceover quando fizer sentido;
- calendario de postagem para Notion MCP ou arquivo importavel;
- publicacao;
- derivadas.

### Arquivos principais

| Arquivo/Pasta | Funcao |
|---|---|
| `Human Team/CLAUDE.md` | Instrucoes gerais do OpenSquad. |
| `Human Team/.claude/commands/team.md` | Comando direto do Time de Agentes Criativos. |
| `Human Team/.claude/skills/opensquad/SKILL.md` | Skill OpenSquad. |
| `Human Team/squads/team/` | Squad criativa padrao. |
| `Human Team/squads/team/pipeline/` | Pipeline de execucao da squad. |
| `Human Team/squads/team/pipeline/data/campaign-delivery-system.md` | Referencia central para campanha completa: projeto, imagens, anuncios, copies, calendario e handoff. |
| `Human Team/squads/team/agents/` | Agentes especializados. |
| `Human Team/_opensquad/core/` | Motor e prompts do OpenSquad. |
| `Human Team/dashboard/` | Dashboard visual local em Vite/React/Phaser. |
| `.claude/commands/team.md` | Comando raiz que ativa o Human Team. |

### Como usar

Na raiz:

```text
/team tenho uma ideia de reel sobre IA para criativos
```

Ou:

```text
/team quero melhorar este roteiro
```

Ou:

```text
/team usar estas referencias como base para uma campanha
```

Ou:

```text
/team tenho um brief de produto e preciso da campanha completa: imagens, anuncios, copies, emails e calendario
```

O comando `/team` nao deve abrir menu generico. Ele inicia a squad criativa padrao e identifica o modo de entrada:

- comecar do zero;
- continuar uma base;
- melhorar algo existente;
- analisar referencia;
- finalizar producao;
- produzir campanha completa.

Quando o escopo for campanha completa, o Human Team ativa o `Campaign Delivery System`. Esse sistema obriga o squad a pensar na entrega final de forma operacional: o Planner define o pacote, o Art Director cuida da identidade e continuidade visual, o Producer organiza assets e pastas, o Social Manager monta calendario Notion MCP/importavel e o Content Multiplier fecha derivadas e copies.

### Resultado esperado

Uma run versionada em:

```text
Human Team/squads/team/output/{run_id}/
```

Com arquivos como:

- `brief.md`;
- `projeto.md`;
- `plano.md`;
- `dossie.md`;
- `conceito.md`;
- `roteiro.md`;
- `art-bible.md`;
- `storyboard.md`;
- `folha-producao.md`;
- `copy-pack.md`;
- `master.md`;
- `publicacao.md`;
- `multiplicacao.md`;
- `handoff.md`;
- `assets/teaser/`;
- `assets/principais/`;
- `assets/secundarias/`;
- `ads/9x16/`;
- `ads/4x5/`;
- `ads/16x9/`;
- `calendar/notion-calendar.md`;
- `calendar/calendar.csv`.

### Entrega de campanha completa

Quando o usuario pedir campanha completa, a entrega esperada e:

- `projeto.md` com objetivo, publico, promessa, canais, formatos, criterios de sucesso e riscos;
- imagens de teaser, principais e secundarias, com continuidade de roupa/look/produto quando houver;
- anuncios em 9:16, 4:5 e 16:9, com headline, primary text, CTA e safe zones;
- `copy-pack.md` com copy geral da campanha, posts, anuncios, emails, CTAs e voiceover quando aplicavel;
- calendario de postagem pronto para Notion MCP ou importacao via CSV;
- `handoff.md` listando arquivos, pendencias, ferramentas externas e proximas acoes.

### Dependencias possiveis

- Claude Code;
- Node/npm/npx;
- Playwright/MCP quando houver investigacao web;
- Notion MCP quando a campanha pedir calendario operacional;
- OpenSquad;
- dashboard local opcional;
- skills adicionais instaladas em `Human Team/skills/`.

### Boas praticas para estudar

1. Leia primeiro `Human Team/.claude/commands/team.md`.
2. Depois leia `squads/team/pipeline/pipeline.yaml`.
3. Estude os agentes em `squads/team/agents/`.
4. Leia os arquivos de expertise em `pipeline/data/expertise/`.
5. Leia `pipeline/data/campaign-delivery-system.md` para entender a entrega final de campanha.
6. Rode um caso pequeno antes de tentar uma campanha completa.
7. Nao pule checkpoints humanos.

## Human Motion

Pasta: `Human Motion/`

Comando:

```text
/motion
```

### O que faz

Human Motion e a skill de Video e Motion Graphics. Ela ensina e opera video pelo terminal usando Remotion: cria Reels de motion graphics, edita videos existentes com titulos/legendas/cortes, aplica pacing, beat-matching e caption design, e renderiza MP4 quando o ambiente esta pronto. Quando o video precisa de imagem, frame, textura, thumbnail, product frame ou background gerado por IA, esses assets nascem antes via Higgsfield CLI + Nano Banana 2 e entram no projeto Remotion como arquivos locais.

### Arquivos principais

| Arquivo/Pasta | Funcao |
|---|---|
| `Human Motion/CLAUDE.md` | Regras centrais do agente Human Motion. |
| `Human Motion/MOTION-PRODUCTION-SYSTEM.md` | Sistema de producao para transformar prompt simples em Reel profissional. |
| `Human Motion/REMOTION-TERMINAL-GUIDE.md` | Guia tecnico de Remotion, preview e render pelo terminal. |
| `Human Motion/templates/remotion-reel/` | Template Remotion local para exercicio de Reel. |
| `.claude/commands/motion.md` | Comando raiz que ativa o Human Motion. |

### Como usar

Na raiz:

```text
/motion crie um Reel de motion graphics de 15s sobre cafe como ritual
```

Para edicao de video existente:

```text
/motion edite este video com titulo, cortes e legenda visual para Reels
```

### Resultado esperado

- brief;
- beat sheet;
- timeline;
- caption design;
- asset plan quando houver visual gerado por IA;
- projeto Remotion ou plano tecnico reproduzivel;
- assets Higgsfield salvos em `Human Motion/runs/{project_slug}/assets/` quando aplicavel;
- comandos de preview/render;
- MP4 final quando houver render real;
- QC de pacing, legibilidade e beat-matching.

### Dependencias possiveis

- Claude Code;
- Node.js LTS;
- npm;
- Remotion;
- Higgsfield CLI para qualquer asset visual gerado por IA;
- FFmpeg/codec via ambiente Remotion quando necessario.

### Boas praticas para estudar

1. Leia `REMOTION-TERMINAL-GUIDE.md`.
2. Estude o template em `templates/remotion-reel/`.
3. Comece por um Reel curto antes de editar videos longos.
4. Revise pacing, legibilidade e render antes de considerar a entrega pronta.

## Dependencias por produto

| Produto | Runtime base | Servicos externos possiveis |
|---|---|---|
| Human Image | Claude Code, Python, Higgsfield CLI | Higgsfield. |
| Human Cinematic | Claude Code, Node/npm, Higgsfield CLI | Higgsfield. |
| Human DNA | Claude Code | Notion, Drive, Higgsfield CLI, Routines quando configurado. |
| Human Carrossel | Claude Code + Routines | Notion, Drive, Higgsfield CLI, web search/fetch. |
| Human Social | Claude Code, Python, Higgsfield CLI | Higgsfield. |
| Human Team | Claude Code, Node/npm/npx, Higgsfield CLI quando houver visual IA | Playwright/MCP, OpenSquad, Higgsfield, skills externas. |
| Human Motion | Claude Code, Node/npm, Remotion, Higgsfield CLI quando houver visual IA | Higgsfield para assets, nenhum obrigatorio para render local puro. |

## Boas praticas gerais de estudo

1. Estude uma pasta por vez.
2. Sempre comece pelo comando raiz em `.claude/commands/`.
3. Depois leia o `CLAUDE.md` ou `SKILL.md` da pasta.
4. Identifique o entregavel antes de executar.
5. Separe o que e configuracao, o que e estado e o que e output.
6. Nunca coloque credenciais reais em arquivos versionados.
7. Quando uma ferramenta externa falhar, registre o erro real e traduza para uma acao simples.
8. Quando melhorar uma pasta, atualize este README.

## Checklist para revisar este README

Sempre que a gente mexer no projeto, revisar este README com estas perguntas:

- Algum comando novo foi criado?
- Alguma pasta mudou de funcao?
- Algum arquivo principal mudou de lugar?
- Alguma dependencia nova apareceu?
- Alguma Routine foi adicionada, removida ou alterada?
- O resultado esperado de algum produto mudou?
- Algum comando interno precisa aparecer aqui?
- Existe alguma informacao que so esta na nossa conversa e ainda nao virou documentacao?
- Uma pessoa nova conseguiria entender por onde comecar?

Se a resposta para qualquer uma dessas perguntas pedir ajuste, o README deve ser atualizado.

## O que ainda vamos melhorar

Este README ja serve como referencia, mas o projeto ainda vai evoluir. Pontos naturais para os proximos ciclos:

- criar um manifesto padrao dentro de cada pasta;
- deixar os comandos mais consistentes entre si;
- melhorar a compatibilidade Mac/Windows onde ainda houver comando muito especifico;
- separar melhor exemplo, output temporario e material essencial;
- documentar melhor a ponte entre Claude Code e Cloud Routines;
- transformar cada produto em uma experiencia cada vez mais simples para o usuario final.

## Regras de seguranca e versionamento

- Nunca versionar `.env`, tokens, chaves ou credenciais reais.
- Nunca versionar `node_modules/`.
- Evitar versionar outputs temporarios, caches, `test-results/` e `*.tsbuildinfo`.
- Versionar docs, templates, scripts, prompts, assets intencionais e exemplos que sejam uteis para treinamento.
- Fazer commit antes de mudancas grandes.
- Fazer push ao terminar marcos importantes.

## Onde aprofundar

Para entender como o roteamento global funciona, leia:

```text
CLAUDE.md
```
