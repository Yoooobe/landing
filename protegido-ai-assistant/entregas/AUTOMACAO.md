---
title: "Automação de publicação — roteiro de configuração"
description: "O que dá para automatizar na campanha, o que nunca vai dar, e o passo a passo para ligar um agendador ao Instagram e ao LinkedIn."
slug: "automacao"
updated: "2026-08-06"
audience: "interno"
noindex: true
---

# Automação de publicação

> Roteiro de configuração. Nada aqui está ligado ainda — é a decisão e o passo a
> passo, para quando ela for tomada.
> Última atualização: 2026-08-06.

---

## 1. O que a API publica e o que ela não publica

Esta é a informação que decide tudo o mais. Não é limitação de ferramenta: é da
API da Meta. Qualquer serviço contratado esbarra no mesmo teto.

| O que vai ao ar | Automatizável | Por quê |
|---|---|---|
| 5 carrosséis de feed 4:5 | **sim**, ponta a ponta | a API publica carrossel com até 10 imagens |
| 5 posts de LinkedIn (OG 1200×630) | **sim** | post de imagem única em Página de empresa |
| 5 e-mails de nutrição | **sim**, em outra ferramenta | não passa por rede social |
| **5 Reels** | **não** — só sem trilha | a API não anexa áudio da biblioteca licenciada do Instagram |
| **16 Stories** | **não** — só sem sticker | enquete, quiz e link sticker não existem na API |

O `CALENDARIO.md` já manda escolher a trilha na hora de postar, e o `LEGENDAS.md`
de cada conceito pede enquete no primeiro story e link sticker no último frame.
Ou seja, o calendário se parte em dois:

- **Terça — Reel + Stories:** continua manual, no celular. O agendador serve
  como lembrete e como cofre das legendas.
- **Quinta — Feed + e-mail + LinkedIn:** automatiza inteiro.

Postar o Reel pela API para "não dar trabalho" custaria a trilha, que é o que
carrega o alcance de Reel. Não compensa.

---

## 2. Antes de escolher a ferramenta — pré-requisitos

Valem para qualquer agendador. Sem isto, nenhum conecta.

- [ ] `@4unikoficial` precisa ser conta **Profissional** (Comercial ou Criador de
      conteúdo), não pessoal. Instagram → Configurações → Tipo de conta.
- [ ] A conta precisa estar **vinculada a uma Página do Facebook** da 4Unik. A
      maioria dos agendadores ainda exige esse vínculo, mesmo com o login novo
      do Instagram para empresas.
- [ ] Quem for conectar precisa ser **administrador** da Página do Facebook e da
      Página da empresa no LinkedIn — não basta ser editor.
- [ ] Definir **de qual conta sai a conexão**. Se sair da conta pessoal de
      alguém, a automação quebra quando essa pessoa sair da empresa. Usar um
      login de empresa.

---

## 3. Caminho recomendado — agendador pronto

Para agosto. O primeiro post é 11/08; não há prazo para revisão de app da Meta.

### 3.1 Escolha

| Ferramenta | A favor | Contra |
|---|---|---|
| **Metricool** | analytics de Instagram e LinkedIn no mesmo painel; modo notificação para Reel e Story; interface em português | mais caro que o Publer |
| **Publer** | mais barato; primeiro comentário automático; recorrência de post | analytics fraco |
| **Buffer** | o mais simples de todos | cobertura de Story e Reel mais limitada |

Faixa de preço das três: US$ 10–25 por mês, por conjunto de contas. Confirmar o
valor no site antes de assinar — muda com frequência.

### 3.2 Configuração, passo a passo

1. Criar a conta com um e-mail **da empresa**, nunca pessoal.
2. Conectar o Instagram: o agendador abre o login do Facebook, você escolhe a
   Página e a conta do Instagram ligada a ela. Conceder todas as permissões que
   ele pedir — negar uma quebra o agendamento sem avisar direito.
3. Conectar o LinkedIn: escolher **Página da empresa**, não o perfil pessoal.
4. Ativar as **notificações no celular** (app do agendador). É por elas que o
   Reel e o Story chegam na terça.
5. Definir fuso horário como **America/Sao_Paulo**. Erro comum: a conta nasce em
   UTC e todo post sai três horas adiantado.

### 3.3 Como carregar as cinco semanas

As peças já estão publicadas e acessíveis. Para cada post, a arte sai de
`plataforma.4unik.com.br/landing/campanha/contact-sheet.html` — clicar na peça
abre o PNG em tamanho real, e o MP4 do Reel toca na própria página.

Para cada linha do `CALENDARIO.md`:

1. Abrir o `LEGENDAS.md` do conceito e copiar a legenda do formato.
2. Baixar as artes do contact sheet, **na ordem dos cards** — carrossel fora de
   ordem inverte o argumento.
3. Agendar:
   - **Feed (quinta):** carrossel, na ordem, legenda colada, primeiro comentário
     vazio. Publicação automática.
   - **Reel (terça):** modo notificação. O agendador guarda o MP4 e a legenda e
     te avisa na hora; você escolhe a trilha no app e publica.
   - **Stories (terça):** modo notificação, um por frame. Enquete no frame 1,
     link sticker só no último.
   - **LinkedIn (quinta):** imagem `_og.png`, legenda adaptada do `LEGENDAS.md`.
4. Conferir contra o bloco de regras no fim do `LEGENDAS.md` antes de salvar.

### 3.4 Limite que importa

A API do Instagram aceita **50 publicações por 24 horas** por conta. A campanha
usa 2 por semana. Folga total — só vira problema se alguém disparar um backlog
inteiro de uma vez.

---

## 4. Caminho 2 — API direto, para setembro em diante

Sem custo mensal e integrado ao pipeline em `tools/`. Não dá para agosto porque
depende de revisão da Meta, que leva de duas a quatro semanas e pode voltar
pedindo correção.

Metade do trabalho já está feita sem querer: a API exige que a mídia esteja numa
**URL pública** que os servidores da Meta consigam baixar, e as peças já estão em
`plataforma.4unik.com.br/landing/campanha/pecas/`. O `noindex` não atrapalha —
ele fala com buscador, não com o robô da Meta.

### 4.1 O que precisa acontecer

1. Criar um app do tipo **Business** no painel de desenvolvedores da Meta.
2. **Verificação de negócio** da 4Unik (CNPJ e documentos). É a etapa lenta.
3. Pedir revisão da permissão de publicação de conteúdo do Instagram, com vídeo
   demonstrando o fluxo. A Meta renomeia essa permissão de tempos em tempos —
   conferir o nome atual na documentação antes de submeter.
4. Gerar um token de longa duração e guardar fora do repositório.

### 4.2 Como o post funciona

Publicar é sempre em dois tempos, nunca numa chamada só:

1. **Criar o contêiner** — `POST /{ig-user-id}/media` com a URL da imagem ou do
   vídeo e a legenda. Devolve um id.
2. **Publicar** — `POST /{ig-user-id}/media_publish` com esse id.

Detalhes que mordem:

- **Carrossel** são três passos: um contêiner por imagem com
  `is_carousel_item=true`, depois um contêiner `media_type=CAROUSEL` listando os
  filhos, depois o publish.
- **Vídeo é assíncrono.** O contêiner de Reel nasce em processamento; é preciso
  consultar o status até virar pronto antes de publicar. Publicar cedo demais
  devolve erro.
- **LinkedIn é outra história.** Postar em Página de empresa pela API exige
  entrar no programa de parceiros do LinkedIn e ser aprovado. É mais burocrático
  que a Meta. Manter o LinkedIn no agendador mesmo depois de automatizar o
  Instagram é uma decisão razoável.

### 4.3 Onde isso moraria

Um `tools/publish-social.mjs` lendo os mesmos `entregas/specs/*.json` e o
`CALENDARIO.md` que já governam a composição. A fonte da verdade não muda: quem
manda continua sendo o spec, e a publicação vira só mais uma saída do pipeline,
ao lado do PNG e do MP4.

---

## 5. E-mail — a 4Unik usa Google Workspace

O Workspace é uma **caixa de correio**, não uma plataforma de e-mail marketing.
Ele entrega bem porque cada mensagem é uma conversa entre duas pessoas; disparo
de campanha é outro comportamento, e é o comportamento que o filtro mede.

O que o Workspace não tem, e a campanha precisa:

- descadastro com um clique, que o próprio Gmail exige de quem manda em volume;
- controle de quem já se descadastrou — no Gmail comum, ninguém;
- abertura e clique por destinatário, que alimentam o `CAMPANHAS-ADS.md`;
- separação entre a reputação do disparo e a reputação do e-mail de trabalho.

Esse último é o risco de verdade. Se a campanha sair de `@4unik.com.br` e uma
parte marcar como spam, quem passa a cair na lixeira é a conversa comercial do
dia a dia — proposta, contrato, resposta a cliente. O prejuízo não fica na
campanha.

### 5.1 Antes de escolher, falta uma decisão

Nenhum documento da campanha diz **para quem** esses cinco e-mails vão. Sem isso
não dá para escolher o caminho, porque a resposta muda tudo. Definir:

- de onde vem a lista e quantos contatos tem;
- se essas pessoas pediram para receber ou se é prospecção fria.

### 5.2 Caminho A — lista pequena, ou prospecção 1 a 1

Se forem algumas dezenas de contatos e a mensagem for de vendas, cabe no
Workspace, usando o **envio múltiplo do Gmail** (mail merge). Ele está nos
planos Business Standard para cima, insere o link de descadastro sozinho e
segura até 1.500 destinatários por dia.

O que ele não faz: relatório de abertura e clique. O retorno vem por resposta e
por reunião marcada no Calendly, e é assim que se registra no painel.

Nesse caminho, o e-mail deveria ser mais simples do que está composto — texto
com um link, não peça desenhada. Hero de campanha em mensagem 1 a 1 é o que
denuncia disparo em massa.

### 5.3 Caminho B — lista de verdade

A partir de algumas centenas de contatos que optaram por receber, entra uma
ferramenta de envio. As gratuitas resolvem a campanha inteira: **Brevo** dá 300
e-mails por dia sem custo, **MailerSend** algo próximo. São cinco disparos em
cinco semanas — não chega perto do teto.

Isso **não substitui** o Workspace. Convive:

| Sai de | O quê |
|---|---|
| Google Workspace, `@4unik.com.br` | conversa, proposta, resposta a cliente |
| Ferramenta de envio, subdomínio | os cinco e-mails da campanha |

**Usar um subdomínio** para o disparo — `news.4unik.com.br` ou
`email.4unik.com.br`. É o que isola as duas reputações: se a campanha se
queimar, o e-mail de trabalho continua entregando. Configurar o subdomínio no
DNS pede acesso ao painel do domínio, não ao Workspace.

### 5.4 O que cada e-mail precisa

Já está escrito no `LEGENDAS.md` do conceito, na seção **E-mail**:

- **Assunto** e **preheader** — os dois definidos, não reescrever na hora.
- **Hero** — o `_email_hero.png` (1200×600), exibido a 600px de largura.
  Hospedar na ferramenta ou apontar para
  `plataforma.4unik.com.br/landing/campanha/pecas/`.
- **Corpo** — os blocos descritos no `LEGENDAS.md`, na ordem.
- **CTA** — um só por e-mail, com o link que o documento manda.
- **Rodapé** — `@4unikoficial`, descadastro e endereço da empresa. Os dois
  últimos são obrigação legal, não enfeite.

Montando o HTML: tabela, largura máxima 600px, CSS em atributo `style` na
própria tag. Nada de `<style>` no topo nem de imagem como plano de fundo — o
Outlook para desktop ignora os dois e a peça chega quebrada. Toda imagem com
`alt` que faça sentido lido sozinho, porque metade das caixas abre com imagem
bloqueada.

### 5.5 Pendência que bloqueia

O e-mail do **i5-integracao** espera um depoimento: **frase, nome e cargo** de
quem assina, por escrito. Prazo **10/09**. Se não vier, o e-mail sai com o bloco
de marcas e sem o depoimento — não substituir por número genérico nem por
depoimento anônimo.

### 5.6 Antes do primeiro disparo

- [ ] Decidir o caminho, o que depende de saber quem recebe (§5.1).
- [ ] SPF, DKIM e DMARC do remetente. O Workspace já assina o domínio
      principal; a ferramenta de envio precisa da assinatura dela no
      subdomínio. Conferir também se a política de DMARC do domínio não
      derruba o que sai do subdomínio.
- [ ] Descadastro funcionando e testado — clicar e ver o contato sair.
- [ ] Teste de entrega para Gmail, Outlook e um domínio corporativo qualquer,
      olhando a caixa de entrada e a de promoções.
- [ ] Abrir o hero no Outlook para desktop antes de disparar.

---

## 6. Depois de publicar

O `CAMPANHAS-ADS.md` tem a linha de cada post à espera do resultado. Registrar
lá, não numa planilha à parte:

- alcance e salvamentos de cada Reel;
- resultado das enquetes dos Stories — é a resposta mais barata que a campanha
  produz sobre o que o público reconhece como dor;
- abertura e clique de cada e-mail;
- reuniões marcadas pelo Calendly no período.

O funil da campanha vai de topo (i1) a fundo (i5). Se o fundo converter e o topo
não engajar, o problema é de alcance. Se o topo engajar e o fundo não converter,
o problema é da oferta — e isso muda o próximo mês, não este.
