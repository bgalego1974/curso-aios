# Curso AIOS: Do Principiante ao Avançado — Product Requirements Document (PRD)

**Version:** 0.3
**Date:** 2026-03-03
**Author:** Morgan (PM Agent)
**Status:** Draft

---

## Goals and Background Context

### Goals

- Criar um curso completo e estruturado que ensine o Synkra AIOS desde fundamentos até uso avançado
- Capacitar developers a adoptarem o AIOS nos seus projectos (greenfield e brownfield)
- Produzir material pedagógico reutilizável (vídeos, cheat sheets, sandbox, exercícios)
- Estabelecer um path de certificação por níveis (Practitioner → Advanced → Architect)
- Gerar adopção e comunidade em torno do AIOS

### Background Context

O Synkra AIOS é um meta-framework que orquestra agentes AI para desenvolvimento full-stack, mas não possui nenhum material educacional formal. Developers que encontram o AIOS enfrentam uma curva de aprendizagem íngreme — 10 agentes, 4 workflows, Constitution com 6 artigos, sistema de tasks/templates/checklists, e dois cenários distintos (greenfield/brownfield). O brainstorming inicial do @analyst gerou 28 ideias e uma estrutura de 12 módulos em 4 níveis, validada como base sólida para este PRD.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-03 | 0.1 | Draft inicial baseado em brainstorming | Morgan (PM) |
| 2026-03-03 | 0.2 | Adicionado Out of Scope, Success Metrics, Risks & Mitigations | Morgan (PM) |
| 2026-03-03 | 0.3 | Decisão técnica: Astro Starlight (decisão @architect). Stack consolidada | Morgan (PM) |

### Success Metrics

| KPI | Baseline | Target | Timeline |
|-----|----------|--------|----------|
| Forks do repo sandbox | 0 | 100 | 3 meses após lançamento |
| Stars no repo do curso | 0 | 250 | 6 meses após lançamento |
| Módulos completados (média por aluno) | 0 | 8 de 12 | 6 meses após lançamento |
| Issues/feedback recebido | 0 | 50 | 3 meses após lançamento |
| Projectos finais submetidos | 0 | 20 | 6 meses após lançamento |
| Downloads de cheat sheets | 0 | 500 | 6 meses após lançamento |

**Mecanismo de medição:** GitHub Insights (forks, stars), Google Analytics no site estático, formulário de feedback no final de cada nível.

---

## Requirements

### Functional Requirements

- **FR1:** O curso deve conter 12 módulos organizados em 4 níveis progressivos (Fundamentos, Arquitectura, Prática, Avançado)
- **FR2:** Cada módulo deve incluir conteúdo teórico, exemplos práticos e pelo menos 1 exercício hands-on
- **FR3:** O curso deve cobrir os 6 artigos da Constitution com explicação e exemplos de gates automáticos
- **FR4:** O curso deve documentar os 10 agentes com papel, autoridade exclusiva e delegation matrix
- **FR5:** O curso deve explicar a engrenagem completa (Workflow → Task → Template → Checklist) com ordem de consulta
- **FR6:** O curso deve incluir sequência passo-a-passo completa para cenário Greenfield (setup → epic → stories → dev → QA → push)
- **FR7:** O curso deve incluir sequência passo-a-passo completa para cenário Brownfield (install → 10 fases discovery → dev)
- **FR8:** O curso deve fornecer comparação directa Greenfield vs Brownfield com tabela de decisão
- **FR9:** O curso deve fornecer um repo template no GitHub (sandbox) com branches por módulo para prática
- **FR10:** O curso deve incluir cheat sheets PDF por nível com comandos, agentes e workflows
- **FR11:** O curso deve cobrir Squads, customização de agentes/tasks/templates e AIOS em produção (CI/CD, MCP)
- **FR12:** O curso deve incluir um projecto final com 2 opções (Greenfield app completa ou Brownfield adoption)
- **FR13:** O curso deve incluir glossário de termos AIOS e mapa de agentes → comandos
- **FR14:** O curso deve cobrir os 4 workflows principais (SDC, QA Loop, Spec Pipeline, Brownfield Discovery) com diagramas

### Non-Functional Requirements

- **NFR1:** Cada módulo deve ser completável em 1-2 horas de estudo self-paced
- **NFR2:** O conteúdo deve estar em Português (PT) como língua principal
- **NFR3:** O formato deve suportar vídeo curto (5-10min) + documentação escrita por módulo
- **NFR4:** O repo sandbox deve funcionar com `npx aios-core install` sem dependências externas além de Node.js 18+
- **NFR5:** Os cheat sheets devem ser exportáveis como PDF de 1-2 páginas por nível
- **NFR6:** O curso deve manter-se actualizado com a versão corrente do AIOS (mecanismo de versionamento)
- **NFR7:** O conteúdo deve ser modular — permitir consumir módulos individuais sem obrigar sequência completa
- **NFR8:** Todos os exemplos de código devem ser testáveis e reproduzíveis pelo aluno

### N/A for this project

Os seguintes domínios são **não aplicáveis** dado que o curso é um site estático sem backend:

- **Security & Compliance** — Sem autenticação, sem dados de utilizador, sem PII. Site estático público
- **Data Storage & Retention** — Sem base de dados. Conteúdo é ficheiros Markdown no Git
- **Performance SLAs** — Site estático servido por CDN (GitHub Pages/Vercel). Performance é responsabilidade do hosting provider
- **Integration APIs** — Sem APIs. O sandbox é um repo independente

---

## Out of Scope (v1)

Os seguintes items estão **explicitamente fora do scope** desta versão:

- **Certificação formal** — Badges e certificação por níveis são objectivo futuro (v2). O projecto final serve como validação na v1
- **Plataforma custom** — Não será construída plataforma proprietária. O curso vive num site estático + GitHub
- **Monetização** — Sem paywall, assinaturas ou modelo de pagamento. Curso é open-source na v1
- **Tradução i18n** — Conteúdo apenas em Português (PT). Tradução para EN/ES é escopo futuro
- **Vídeos profissionais** — Vídeos são complementares e podem ser adicionados após lançamento do conteúdo escrito. Não são blocker
- **Suporte ao aluno** — Sem mentoria, fórum ou Discord dedicado na v1. Feedback via GitHub Issues
- **Integração com LMS** — Sem integração com Moodle, Coursera ou plataformas similares
- **Mobile app** — Curso acessível via browser mobile, sem app nativa

---

## Risks & Mitigations

| # | Risco | Probabilidade | Impacto | Mitigação |
|---|-------|--------------|---------|-----------|
| R1 | AIOS evolui e curso fica desactualizado | Alta | Alto | Versionamento curso↔AIOS com tags. CI smoke test no sandbox detecta quebras. Secção de changelog por módulo |
| R2 | Sandbox quebra com update do AIOS | Média | Alto | GitHub Actions com smoke test semanal. Dependabot ou renovate para dependencies |
| R3 | Conteúdo demasiado denso para principiantes | Média | Médio | Beta testers nos módulos 0-2 antes de lançar. Feedback form no final de cada módulo |
| R4 | Baixa adopção / poucos forks | Média | Médio | Divulgação na comunidade AIOS, posts em dev.to/LinkedIn. Medir e ajustar após 1 mês |
| R5 | Exercícios não funcionam no Windows sem WSL | Baixa | Médio | Testar todos os exercícios em Windows + macOS + Linux. Documentar workarounds por OS |
| R6 | Scope creep durante produção de conteúdo | Média | Médio | PRD como fonte de verdade. Cada story tem ACs claros. Out of Scope explícito |

---

## User Interface Design Goals

### Overall UX Vision

A experiência do aluno deve ser progressiva e prática — nunca sentir que está a ler documentação, mas sim a construir algo real. Cada módulo segue o padrão: contexto → conceito → prática → validação.

### Key Interaction Paradigms

- **Learn by doing** — Cada conceito é imediatamente praticado no sandbox
- **Progressive disclosure** — Complexidade revelada gradualmente (Nível 1 esconde detalhes avançados)
- **Reference-friendly** — Cheat sheets e glossário acessíveis a qualquer momento

### Core Screens / Artefactos

1. **Página de índice do curso** — Visão geral dos 4 níveis e 12 módulos com progresso
2. **Página de módulo** — Conteúdo teórico + vídeo + exercício + cheat sheet
3. **Repo sandbox (GitHub)** — Branches por módulo, README com instruções
4. **Cheat sheets PDF** — 1 por nível, imprimível
5. **Projecto final** — Briefing + critérios de avaliação

### Accessibility

- WCAG AA — conteúdo acessível (alt text em diagramas, contraste em PDFs)
- Texto como formato primário (não depender apenas de vídeo)

### Branding

- Alinhado com identidade visual do Synkra AIOS
- Diagramas em estilo consistente (ASCII para CLI, Mermaid para web)

### Target Platforms

- **Web Responsive** — conteúdo publicável como site estático (docs) ou plataforma de cursos
- **PDF** — cheat sheets offline
- **GitHub** — repo sandbox

---

## Technical Assumptions

### Repository Structure

**Monorepo** — Um único repositório contendo:
- `/content/` — Conteúdo dos módulos (Markdown)
- `/sandbox/` — Projecto-exemplo para prática (branches por módulo)
- `/assets/` — Cheat sheets, diagramas, imagens
- `/scripts/` — Geração de PDFs, validação de exemplos

### Service Architecture

- **Site estático** — Conteúdo publicado via **Astro Starlight** (decisão @architect 2026-03-03)
- **GitHub Pages** para hosting (decisão PO 2026-03-03)
- **Sem backend** — Curso é totalmente estático, sem autenticação ou tracking
- **Pesquisa** — Pagefind (built-in no Starlight, zero config)
- Certificação (se implementada) seria via badge manual ou integração futura

### Stack Técnica

| Componente | Tecnologia | Rationale |
|-----------|-----------|-----------|
| Conteúdo | Markdown (.md) | Universal, versionável, CLI-friendly |
| Site | **Astro Starlight** | i18n built-in (PT incluído), Pagefind zero-config, WCAG AA, sem framework lock-in |
| Sandbox | Repo GitHub com AIOS instalado | Aluno faz fork e pratica |
| Cheat sheets | Markdown → PDF (via pandoc ou similar) | Automação simples |
| Diagramas | Mermaid + ASCII | Renderizáveis em Markdown, coerentes com CLI First |
| Vídeos | Hosting externo (YouTube/Loom) | Não polui o repo, streaming gratuito |

### Testing Requirements

- **Validação de exemplos** — Scripts que testam se os snippets de código do curso funcionam com a versão actual do AIOS
- **Link checking** — Verificar que referências internas e externas não estão quebradas
- **Build test** — CI que verifica se o site estático compila sem erros
- **Sandbox smoke test** — Verificar que o repo sandbox funciona com `npx aios-core install` + `aios doctor`

### Additional Technical Assumptions

- Node.js 18+ como requisito mínimo para o aluno
- Git instalado e configurado
- Claude Code instalado (para interagir com agentes AIOS)
- O curso assume acesso a terminal Unix-like (macOS/Linux/WSL no Windows)
- Conteúdo versionado com tags alinhadas às versões do AIOS (ex: `curso-v1.0-aios-v2.1`)

---

## Epic List

| Epic | Título | Goal |
|------|--------|------|
| **Epic 1** | Fundação & Conteúdo Core | Estabelecer repo, site estático, e produzir os módulos 0-2 (Fundamentos) — aluno consegue instalar AIOS e entender princípios |
| **Epic 2** | Arquitectura do Sistema | Produzir módulos 3-5 (Agentes, Engrenagem, Workflows) — aluno entende como todo o sistema funciona |
| **Epic 3** | Sequências Práticas & Sandbox | Produzir módulos 6-8 (Greenfield, Brownfield, Comparação) + repo sandbox funcional — aluno pratica end-to-end |
| **Epic 4** | Conteúdo Avançado & Projecto Final | Produzir módulos 9-11 (Squads, Customização, Produção) + projecto final + cheat sheets + glossário |

---

## Epic 1: Fundação & Conteúdo Core

**Goal:** Estabelecer a infraestrutura do curso (repo, site estático, CI) e produzir os 3 primeiros módulos (Fundamentos). Ao completar este epic, o aluno consegue instalar o AIOS, entender os princípios fundamentais e navegar pela estrutura do projecto.

### Story 1.1: Setup do Repositório e Site Estático

> Como **maintainer do curso**,
> quero ter um repositório monorepo com site estático configurado,
> para que o conteúdo seja publicável e versionável desde o início.

**Acceptance Criteria:**
1. Repositório criado com estrutura `/content/`, `/sandbox/`, `/assets/`, `/scripts/`
2. Site estático configurado (VitePress ou Astro Starlight) com build funcional
3. Deploy automático via GitHub Pages ou Vercel no push para main
4. CI pipeline com build test e link checking
5. README com instruções de contribuição e setup local
6. Estrutura de navegação do site reflecte os 4 níveis e 12 módulos (placeholders)

### Story 1.2: Módulo 0 — O Problema

> Como **aluno principiante**,
> quero entender porque o AIOS existe e que problemas resolve,
> para que tenha motivação e contexto antes de instalar.

**Acceptance Criteria:**
1. Conteúdo publicado com narrativa Before/After (dev sem AIOS vs com AIOS)
2. Pelo menos 3 cenários de dor concretos (commits soltos, sem QA, sem rastreio)
3. Explicação clara do que é um AI-Orchestrated System em 2-3 parágrafos
4. Diagrama visual (Mermaid) do fluxo AIOS vs fluxo caótico
5. Exercício incluído: "Listar 5 problemas do teu workflow actual"
6. Página renderiza correctamente no site estático

### Story 1.3: Módulo 1 — Princípios & Constitution

> Como **aluno principiante**,
> quero conhecer os princípios fundamentais e a Constitution do AIOS,
> para que entenda as regras inegociáveis antes de usar o framework.

**Acceptance Criteria:**
1. Os 6 artigos da Constitution explicados com descrição, severidade e exemplo prático de cada
2. Hierarquia CLI > Observability > UI explicada com rationale
3. Framework Boundary (4 camadas L1-L4) documentado com tabela e exemplos de ficheiros reais
4. Gates automáticos explicados — o que bloqueia e porquê, com exemplo de violação
5. Exercício incluído: "Identificar a camada (L1-L4) de 10 ficheiros"
6. Diagrama das 4 camadas com código de cores

### Story 1.4: Módulo 2 — Instalação & Anatomia do Projecto

> Como **aluno principiante**,
> quero instalar o AIOS e entender a estrutura de pastas,
> para que consiga navegar no projecto com confiança.

**Acceptance Criteria:**
1. Guia passo-a-passo de instalação (`npx aios-core install`, `aios doctor`, `aios info`)
2. Tour completo pela estrutura de pastas com explicação de cada directório principal
3. Mapeamento de ficheiros de configuração chave (`core-config.yaml`, `.claude/settings.json`, `.claude/rules/`)
4. Explicação de `.claude/rules/` — o que são, quando carregam, como funcionam
5. Exercício incluído: "Correr `aios doctor` e interpretar cada check"
6. Pré-requisitos claramente listados (Node.js 18+, Git, Claude Code)
7. Troubleshooting para os 5 erros mais comuns na instalação

### Story 1.5: Cheat Sheet Nível 1

> Como **aluno principiante**,
> quero um resumo de 1-2 páginas dos conceitos do Nível 1,
> para que tenha referência rápida enquanto pratico.

**Acceptance Criteria:**
1. PDF de 1-2 páginas com: 6 artigos da Constitution (resumo), 4 camadas L1-L4, comandos de instalação, estrutura de pastas simplificada
2. Design limpo e legível em impressão P&B
3. Versão Markdown incluída no repo (source do PDF)
4. Script de geração PDF funcional (`npm run generate:cheatsheet`)

---

## Epic 2: Arquitectura do Sistema

**Goal:** Produzir os módulos 3-5 que explicam como o AIOS funciona por dentro — agentes, engrenagem (tasks/templates/checklists) e os 4 workflows. Ao completar este epic, o aluno entende toda a mecânica do sistema e consegue escolher o workflow correcto para cada situação.

### Story 2.1: Módulo 3 — Os Agentes

> Como **aluno intermédio**,
> quero conhecer todos os agentes, os seus papéis e autoridades,
> para que saiba qual agente usar em cada situação.

**Acceptance Criteria:**
1. Tabela completa dos 10 agentes com persona, papel e autoridade exclusiva
2. Delegation Matrix documentada com diagramas de fluxo (quem delega a quem)
3. Operações bloqueadas por agente (tabela de permissões)
4. Como activar, usar comandos (`*help`, `*exit`) e trocar de agente
5. Agent Handoff explicado — o que preserva, o que descarta, tamanho do artefacto
6. Exercício: "Activar @sm, criar draft, trocar para @po, validar — observar handoff"
7. Diagrama visual do mapa de agentes e suas relações

### Story 2.2: Módulo 4 — Tasks, Templates, Checklists & Workflows

> Como **aluno intermédio**,
> quero entender como as peças do sistema encaixam e em que ordem são consultadas,
> para que compreenda o motor que governa toda a execução.

**Acceptance Criteria:**
1. Definição clara de cada peça (Task, Template, Checklist, Workflow) com localização no filesystem
2. Diagrama de ordem de consulta: Workflow → Task → Template → Checklist
3. Exemplo concreto completo: criar uma story passando por cada peça
4. Anatomia de uma Task (frontmatter, input, output, process, checklist)
5. Anatomia de um Template (YAML, sections, output format)
6. Anatomia de uma Checklist (pre-conditions, post-conditions, acceptance criteria)
7. Exercício: "Abrir `dev-develop-story.md`, identificar templates e checklists referenciados, traçar o fluxo"

### Story 2.3: Módulo 5 — Os 4 Workflows Principais

> Como **aluno intermédio**,
> quero dominar os 4 workflows do AIOS e saber quando usar cada um,
> para que escolha o workflow correcto para cada cenário de trabalho.

**Acceptance Criteria:**
1. **SDC** documentado com diagrama das 4 fases (Create → Validate → Implement → QA Gate), transições de status e decisões (GO/NO-GO, PASS/FAIL)
2. **QA Loop** documentado com ciclo iterativo, verdicts (APPROVE/REJECT/BLOCKED), triggers de escalação e limite de 5 iterações
3. **Spec Pipeline** documentado com 3 classes de complexidade (SIMPLE/STANDARD/COMPLEX), fases condicionais e gate Constitutional (Art. IV)
4. **Brownfield Discovery** documentado com as 10 fases agrupadas (Colecta/Validação/Finalização) e QA Gate intermédio
5. Tabela de decisão: "Dado este cenário, usa este workflow"
6. Diagramas Mermaid para cada workflow
7. Exercício: "Escolher o workflow correcto para 5 cenários descritos"

### Story 2.4: Cheat Sheet Nível 2

> Como **aluno intermédio**,
> quero um resumo dos agentes, engrenagem e workflows,
> para que tenha referência rápida durante a prática.

**Acceptance Criteria:**
1. PDF de 1-2 páginas com: mapa de agentes (tabela resumida), ordem de consulta (Workflow→Task→Template→Checklist), 4 workflows resumidos com fluxo simplificado, tabela de decisão de workflow
2. Design consistente com cheat sheet do Nível 1
3. Versão Markdown source incluída
4. Geração via mesmo script (`npm run generate:cheatsheet`)

---

## Epic 3: Sequências Práticas & Sandbox

**Goal:** Produzir os módulos 6-8 (Greenfield, Brownfield, Comparação) e o repo sandbox funcional. Ao completar este epic, o aluno consegue executar um projecto completo end-to-end com AIOS em ambos os cenários.

### Story 3.1: Repo Sandbox — Projecto-Exemplo

> Como **aluno prático**,
> quero um repositório template no GitHub que posso fazer fork,
> para que pratique os comandos AIOS num ambiente seguro e preparado.

**Acceptance Criteria:**
1. Repo público no GitHub com AIOS pré-instalado e funcional
2. Branch `main` com projecto-exemplo limpo (SaaS simples — ex: task manager)
3. Branches por módulo (`modulo-6-greenfield`, `modulo-7-brownfield`) com estado inicial preparado
4. README com instruções de fork, setup (`npm install`, `npx aios-core doctor`) e navegação entre branches
5. `.aios-core/` configurado com constitution, agentes e workflows funcionais
6. Smoke test: `npx aios-core install && npx aios-core doctor` passa sem erros
7. GitHub Actions com CI que valida que o sandbox continua funcional

### Story 3.2: Módulo 6 — Greenfield (Projecto do Zero)

> Como **aluno prático**,
> quero seguir uma sequência passo-a-passo para criar um projecto do zero com AIOS,
> para que consiga replicar o processo nos meus próprios projectos.

**Acceptance Criteria:**
1. Sequência completa documentada: Setup → Definição (@pm epic) → Spec (se complexo) → Stories (@sm draft → @po validate) → Implementação (@dev develop → @qa gate) → Entrega (@devops push)
2. Cada passo mostra o comando exacto, o agente responsável, e o output esperado
3. Screenshots ou blocos de código com outputs reais do AIOS para cada fase
4. Diagrama de fluxo completo (Mermaid) da sequência greenfield
5. Exercício guiado: aluno executa toda a sequência no sandbox (branch `modulo-6-greenfield`)
6. Secção de troubleshooting com os 5 erros mais comuns em greenfield
7. Referência cruzada aos módulos 3-5 (agentes, engrenagem, workflows) nos pontos relevantes

### Story 3.3: Módulo 7 — Brownfield (Projecto Existente)

> Como **aluno prático**,
> quero seguir uma sequência passo-a-passo para adoptar AIOS num projecto existente,
> para que consiga integrar o AIOS em projectos legados com confiança.

**Acceptance Criteria:**
1. Sequência completa documentada: Install → Discovery 10 fases (Colecta → Validação → Finalização) → Desenvolvimento (SDC normal)
2. Cada fase do Brownfield Discovery detalhada com agente, task, output esperado e critério de transição
3. Explicação do QA Gate intermédio (Phase 7): APPROVED vs NEEDS WORK e o que acontece em cada caso
4. Screenshots ou blocos de código com outputs reais para cada fase
5. Exercício guiado: aluno executa as 10 fases no sandbox (branch `modulo-7-brownfield` com projecto legado simulado)
6. Diferença clara entre "o que já existe" e "o que o AIOS vai gerar" em cada fase
7. Secção de troubleshooting com os 5 erros mais comuns em brownfield

### Story 3.4: Módulo 8 — Greenfield vs Brownfield

> Como **aluno prático**,
> quero uma comparação directa entre os dois cenários,
> para que saiba qual abordagem usar em cada situação.

**Acceptance Criteria:**
1. Tabela comparativa completa (primeiro passo, tempo, quem lidera, riscos, quando usar Spec Pipeline, output inicial, agentes envolvidos)
2. Árvore de decisão visual: "Tenho código existente?" → sim/não → caminho recomendado
3. 5 cenários reais com recomendação fundamentada (ex: "API existente mas frontend novo" → Brownfield para backend, Greenfield para frontend)
4. Diagrama lado-a-lado dos dois fluxos completos
5. Exercício: "Dado estes 5 cenários, escolher e justificar Greenfield ou Brownfield"

### Story 3.5: Cheat Sheet Nível 3

> Como **aluno prático**,
> quero um resumo das sequências Greenfield e Brownfield,
> para que tenha referência rápida enquanto executo projectos reais.

**Acceptance Criteria:**
1. PDF de 1-2 páginas com: sequência Greenfield resumida (6 fases, 1 linha cada), sequência Brownfield resumida (10 fases + SDC), árvore de decisão Greenfield vs Brownfield, comandos-chave por fase
2. Design consistente com cheat sheets anteriores
3. Versão Markdown source incluída
4. Geração via mesmo script

---

## Epic 4: Conteúdo Avançado & Projecto Final

**Goal:** Produzir os módulos 9-11 (Squads, Customização, Produção), o projecto final, cheat sheet final e glossário. Ao completar este epic, o aluno domina o AIOS completo e tem capacidade de o customizar e usar em produção.

### Story 4.1: Módulo 9 — Squads & Expansões

> Como **aluno avançado**,
> quero entender o sistema de squads e como expandir o AIOS com equipas especializadas,
> para que consiga escalar o framework para domínios específicos.

**Acceptance Criteria:**
1. Conceito de squad explicado — o que são, quando usar, como diferem de agentes individuais
2. Documentação do squad creator (`@squad-creator`) com fluxo de criação
3. Mind cloning explicado — capturar padrões de pensamento, Voice DNA, Thinking DNA
4. Pelo menos 3 squads existentes documentados como exemplo (Design System, Copy Chief, Cyber Chief)
5. Exercício: "Criar um squad customizado para o teu domínio" com template guiado
6. Diagrama da relação squad → agentes → tasks

### Story 4.2: Módulo 10 — Customização do Framework

> Como **aluno avançado**,
> quero saber como criar agentes, tasks, templates e checklists custom,
> para que consiga estender o AIOS sem modificar o core (L1/L2).

**Acceptance Criteria:**
1. Tutorial completo: criar agente custom (YAML) com persona, comandos e dependencies
2. Tutorial completo: criar task custom (MD) com input, output, process e checklist
3. Tutorial completo: criar template custom (YAML) com sections e output format
4. Tutorial completo: criar checklist custom (MD) com pre/post-conditions
5. Rules system explicado — como adicionar rules em `.claude/rules/`, frontmatter `paths:`, auto-loading
6. Exemplo end-to-end: criar agente + task + template + checklist que funcionam juntos
7. Exercício: "Criar um agente custom com 2 comandos, 1 task e 1 template funcionais"
8. Referência clara ao boundary L1-L4 — o que pode e não pode ser modificado

### Story 4.3: Módulo 11 — AIOS em Produção

> Como **aluno avançado**,
> quero saber como usar o AIOS em projectos reais com CI/CD e integrações,
> para que consiga adoptar o framework profissionalmente.

**Acceptance Criteria:**
1. Pre-push quality gates documentados (`npm run lint` + `typecheck` + `test`)
2. @devops e operações exclusivas — fluxo completo de push → PR → merge → release
3. MCP & integrações documentadas: Docker Gateway, EXA, Context7, Playwright — quando usar cada um
4. `aios graph` documentado com todos os formatos (ASCII, JSON, HTML, Mermaid, DOT)
5. Debug e monitorização: `AIOS_DEBUG=true`, logs, trace
6. Boas práticas para equipas: convenções git, branch strategy, code review com CodeRabbit
7. Exercício: "Configurar pipeline completo: dev → QA gate → push → PR"

### Story 4.4: Projecto Final

> Como **aluno que completou o curso**,
> quero um projecto final que aplique todos os conhecimentos,
> para que consolide a aprendizagem e tenha um portfolio piece.

**Acceptance Criteria:**
1. Briefing com 2 opções: Opção A (Greenfield — app completa) e Opção B (Brownfield — adopção em projecto existente)
2. Opção A: mínimo 1 epic com 5 stories, usando SDC completo, QA loop em pelo menos 2 stories, deploy via @devops
3. Opção B: Brownfield discovery completo (10 fases), tech debt report, epic com 5 stories, implementar 3 stories com SDC
4. Critérios de avaliação claros e mensuráveis por opção (checklist de entrega)
5. Template de submissão com secções: resumo do projecto, decisões tomadas, métricas (stories completas, QA pass rate, etc.)

### Story 4.5: Cheat Sheet Nível 4 & Glossário

> Como **aluno avançado**,
> quero referência rápida do nível avançado e glossário completo do AIOS,
> para que tenha material de consulta permanente.

**Acceptance Criteria:**
1. Cheat sheet PDF com: comandos de squad, anatomia de agente/task/template/checklist custom, pipeline de produção, `aios graph` commands
2. Glossário completo de termos AIOS (mínimo 25 termos) com definição concisa
3. Mapa de agentes → comandos principais (tabela de referência rápida)
4. Índice geral do curso com links para cada módulo
5. Design consistente com cheat sheets anteriores
6. Tudo incluído no site estático como páginas de referência permanente

---

## Checklist Results Report

**Executed:** 2026-03-03 | **Overall Completeness:** 88% | **Readiness:** READY FOR ARCHITECT

| Category | Status | Notes |
|----------|--------|-------|
| 1. Problem Definition & Context | **PASS** (90%) | Success Metrics adicionados com KPIs e timeline |
| 2. MVP Scope Definition | **PASS** (90%) | Out of Scope adicionado. MVP validation via feedback forms + GitHub Insights |
| 3. User Experience Requirements | **PASS** (90%) | UX Vision clara, artefactos definidos |
| 4. Functional Requirements | **PASS** (95%) | 14 FRs claros, testáveis |
| 5. Non-Functional Requirements | **PASS** (90%) | 8 NFRs + N/A explicitado para security/data |
| 6. Epic & Story Structure | **PASS** (95%) | 4 epics, 19 stories com ACs |
| 7. Technical Guidance | **PASS** (90%) | Stack definida, riscos identificados |
| 8. Cross-Functional Requirements | **PARTIAL** (75%) | N/A explicitado. Plano operacional a definir na v1.0 |
| 9. Clarity & Communication | **PASS** (92%) | Documento versionado, linguagem clara |

**Issues resolvidas na v0.2:**
- ~~H1: Out of Scope~~ → Adicionado
- ~~H2: Success Metrics~~ → Adicionado com 6 KPIs e timeline
- ~~H3: Risks & Mitigations~~ → Adicionado com 6 riscos
- ~~M1: N/A explícito~~ → Adicionado

**Issues restantes (non-blocking):**
- M2: Competitive analysis (pode ser feito pelo @analyst em paralelo)
- M3: MVP validation approach detalhado (coberto parcialmente pelos Success Metrics)
- L1: Personas detalhadas
- L2: Plano operacional de manutenção

---

## Next Steps

### UX Expert Prompt

> @ux-design-expert: Revê o PRD do Curso AIOS (`docs/prd-curso-aios.md`) e cria a arquitectura frontend para o site estático do curso. Foco em: estrutura de navegação dos 4 níveis/12 módulos, layout da página de módulo (conteúdo + vídeo + exercício), design system mínimo (tokens, tipografia, cores), e experiência mobile responsive. O site será Astro Starlight.

### Architect Prompt

> @architect: Revê o PRD do Curso AIOS (`docs/prd-curso-aios.md`) e define a arquitectura técnica. Stack decidida: Astro Starlight. Pendente: estrutura do monorepo, CI/CD pipeline (build + link check + sandbox smoke test), estratégia de versionamento curso↔AIOS, e script de geração de cheat sheets PDF. Hosting: GitHub Pages/Vercel, sem backend.
