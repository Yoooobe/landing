# Human Agent Lab — Orquestrador

Este repositorio e a central dos sistemas Human. Ele tem **duas funcoes**:

1. **Roteador local** — cada pasta e um produto/skill independente, e a conversa na raiz
   roteia para um dos sete comandos canonicos abaixo (uso local, dentro deste repo).
2. **Skill-Factory** — quando acionado para isso, o orquestrador **le cada produto e o
   transforma em uma skill autocontida, instalada na pasta global de skills do agente**,
   para uso em qualquer projeto. Procedimento completo: `.claude/skill-factory.md`.

| Comando | Produto | Pasta |
|---|---|---|
| `/image` | Human Image | `Human Images/` |
| `/product` | Human Cinematic | `Human Cinematic/` |
| `/dna` | Human DNA | `Human DNA/` |
| `/carrossel` | Human Carrossel | `Human Carroussel/` |
| `/social` | Human Social | `Human Social/` |
| `/team` | Human Team | `Human Team/` |
| `/motion` | Human Motion | `Human Motion/` |
| `/instalar` | Skill-Factory (cria + instala as skills) | `.claude/skill-factory.md` |

## Regra de roteamento

Quando o usuario acionar um comando, carregue o arquivo `.Codex/commands/{comando}.md` correspondente e siga as instrucoes dele. Se o usuario pedir algo em linguagem natural sem comando explicito, escolha o comando mais provavel pela intencao:

- imagem, prompt visual, Higgsfield CLI, Nano Banana 2 -> `/image`
- filme, video, produto cinematico, campanha visual, Seedance, Higgsfield -> `/product`
- identidade de marca, DNA criativo, tom de voz, visual system, auditoria de marca -> `/dna`
- carrossel jornalistico, news-to-carousel, Notion, rotina diaria de noticias -> `/carrossel`
- desdobrar conteudo em Instagram/LinkedIn, adaptar uma pasta com texto e imagens -> `/social`
- `/desdobrar` e alias direto do Human Social. Se esse pedido aparecer dentro de outra skill, carregue o Human Social como subfluxo compartilhado.
- time de agentes, squad criativa, pipeline multiagente, producao completa -> `/team`
- motion graphics, Remotion, video pelo terminal, Reel animado, legenda/caption design, pacing, beat-matching -> `/motion`
- ler o orquestrador, transformar tudo em skill, criar/instalar as skills, usar as skills em qualquer projeto -> `/instalar` (modo Skill-Factory)

## Modo Skill-Factory

Quando o usuario pedir para "ler o orquestrador", "transformar tudo em skill",
"criar/instalar as skills" ou acionar `/instalar`, entre no **modo Skill-Factory** e siga
`.claude/skill-factory.md`. As 7 pastas continuam independentes; o orquestrador nao as
altera. Cada produto vira uma **skill autocontida** instalada na pasta global de skills
do agente, feita pelo proprio agente (nunca pelos instaladores em `install/`). Fluxo:
ler -> apresentar a fila -> esperar OK explicito -> criar e instalar uma por vez ->
relatorio final.

## Regras gerais

- Fale com o usuario em portugues.
- O ambiente oficial de treinamento e execucao e o Codex, com compatibilidade obrigatoria para Mac e Windows.
- Toda geracao visual do projeto usa **Higgsfield CLI**, nunca Higgs MCP, fal.ai, Flow AI ou outro provedor como caminho principal.
- Toda imagem, still, frame, product shot, anuncio estatico ou asset visual gerado por IA usa obrigatoriamente **Nano Banana 2** (`nano_banana_2`) via Higgsfield CLI, exceto quando a pasta do produto definir outro modelo.
- Human Carrossel usa obrigatoriamente **GPT Image 2** (`gpt_image_2`) via Higgsfield CLI para todo slide visual, sempre enviando referencias como `--image` quando existirem.
- Antes de gerar qualquer asset visual, confirme ou deduza com seguranca: nome do projeto, quantidade, aspect ratio/formato de canal, resolucao, referencias, objetivo de uso e pasta de saida.
- Nunca salve entregas soltas em um `output/` generico. Cada execucao precisa de uma subpasta propria por projeto/run, com prompts, parametros, logs/metadados e arquivos finais.
- Se uma skill nao for primariamente visual, mas precisar criar imagem, frame, mockup, teaser, thumbnail ou asset de campanha, ela deve acionar o mesmo padrao Higgsfield CLI + Nano Banana 2.
- Quando o usuario pedir para usar as skills em qualquer pasta, use o modo **Skill-Factory** (`/instalar` / `.claude/skill-factory.md`): crie e instale cada produto como skill autocontida na pasta global de skills do agente. **Nao** use `install/install.sh`, `install/install.ps1` nem `install/install-global-commands.py` — estao aposentados.
- As skills instaladas sao autocontidas: nao dependem de `HUMAN_AGENT_LAB_HOME`. Os outputs da execucao de cada skill nascem na pasta atual do usuario, em `human-output/{skill}/{run_slug}/` (excecao: Human Social escreve em `{pasta-de-entrada}/desdobramento/`).
- Ao finalizar qualquer execucao que gere arquivos, informe sempre a **pasta final** em link clicavel e liste todos os arquivos gerados em links clicaveis, usando caminho absoluto. Excecao: nao liste arquivos `.md` individualmente, a menos que o usuario peca. Mesmo quando so houver arquivos `.md`, ainda informe a pasta final clicavel para a pessoa conseguir abrir e encontrar tudo.
- Na resposta final de entregas, separe claramente: `Pasta final` e `Arquivos gerados`. Em `Arquivos gerados`, inclua todos os arquivos nao-`.md` criados na execucao, sem omitir imagens, videos, PDFs, CSVs, JSONs, HTMLs, ZIPs, fontes ou assets. Se nao houver arquivos nao-`.md`, diga isso em uma frase curta e mantenha o link da pasta.
- Cloud Routines e Routines locais fazem parte da arquitetura oficial quando o produto exigir automacao recorrente, agendamento ou execucao em nuvem.
- Todo fluxo com Routines deve ter setup claro a partir do Codex, com instrucoes seguras para Mac e Windows quando houver parte local.
- Caminhos exclusivos de macOS ou comandos Unix devem ter alternativa Windows antes de virar treinamento oficial.
- Nao misture sistemas: depois de rotear para um produto, siga as regras da pasta daquele produto.
- Excecao compartilhada: se qualquer skill precisar desdobrar uma pasta com texto + imagens em IG Feed, IG Stories e LinkedIn Feed, acione o Human Social lendo `.Codex/commands/social.md` ou `.Codex/commands/desdobrar.md`.
- Antes de executar comandos pagos, externos ou que dependem de credenciais, confirme se a configuracao necessaria existe.
- Se uma pasta tiver `AGENTS.md`, leia esse arquivo primeiro. Se tiver `COMECE-AQUI.md`, use como guia humano/operacional. Se tiver `SKILL.md` ou comando interno, preserve o fluxo existente.
- Mantenha cada produto autonomo; o orquestrador so decide qual sistema usar.
