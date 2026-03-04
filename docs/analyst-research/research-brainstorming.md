# 📚 Curso AIOS: Do Principiante ao Avançado

**Versão:** 2.0
**Data:** 2026-03-03
**Autor:** Atlas (Analyst Agent)
**Duração estimada:** 6 semanas (self-paced)

---

## Visão Geral

Este curso cobre o Synkra AIOS de forma progressiva — desde os fundamentos e princípios, passando pela arquitectura de agentes, workflows, tasks, templates e checklists, até à utilização avançada com squads e customização. Inclui sequências práticas completas para projectos greenfield e brownfield.

---

## NÍVEL 1 — FUNDAMENTOS (Semanas 1-2)

### Módulo 0: O Problema

**Objectivo:** Entender porquê o AIOS existe.

**Conteúdo:**
- O caos do desenvolvimento sem framework:
  - Commits soltos sem convenção
  - Sem rastreio de stories ou requisitos
  - QA inexistente ou manual
  - Decisões de arquitectura não documentadas
- O que é um AI-Orchestrated System
- Before/After — como o AIOS transforma o workflow
- Demonstração rápida: um ciclo completo em 5 minutos

**Exercício:** Listar 5 problemas do teu workflow actual que o AIOS pode resolver.

---

### Módulo 1: Princípios & Constitution

**Objectivo:** Conhecer as leis fundamentais do AIOS.

#### Os 6 Artigos da Constitution

| Artigo | Princípio | Severidade | O que significa |
|--------|-----------|------------|-----------------|
| I | CLI First | NON-NEGOTIABLE | A CLI é a fonte da verdade. UI nunca controla, apenas observa. |
| II | Agent Authority | NON-NEGOTIABLE | Cada agente tem autoridade exclusiva sobre o seu domínio. |
| III | Story-Driven Development | MUST | Todo trabalho começa com uma story. Sem story, sem código. |
| IV | No Invention | MUST | Tudo no spec deve rastrear a um requisito. Nada inventado. |
| V | Quality First | MUST | Quality gates são obrigatórios, não opcionais. |
| VI | Absolute Imports | SHOULD | Imports absolutos, nunca relativos. |

#### Hierarquia de Prioridades

```
CLI First → Observability Second → UI Third
```

- Funcionalidades novas devem funcionar 100% via CLI antes de ter UI
- Dashboards observam, nunca controlam
- A CLI é onde a inteligência vive

#### Framework Boundary — 4 Camadas

| Camada | Mutabilidade | O que contém | Regra |
|--------|-------------|--------------|-------|
| **L1** Framework Core | NUNCA modificar | `.aios-core/core/`, `constitution.md`, `bin/` | Protegido por deny rules |
| **L2** Framework Templates | NUNCA modificar | `tasks/`, `templates/`, `checklists/`, `workflows/` | Extend-only |
| **L3** Project Config | Mutável (exceções) | `.aios-core/data/`, `MEMORY.md`, `core-config.yaml` | Allow rules |
| **L4** Project Runtime | SEMPRE modificar | `docs/stories/`, `packages/`, `squads/`, `tests/` | Trabalho do projecto |

#### Gates Automáticos

- Violações da Constitution são **bloqueadas automaticamente**
- Deny rules em `.claude/settings.json` reforçam as camadas L1/L2
- `core-config.yaml` → `boundary.frameworkProtection: true/false`

**Exercício:** Identificar a camada (L1-L4) de 10 ficheiros do projecto.

---

### Módulo 2: Instalação & Anatomia do Projecto

**Objectivo:** Instalar o AIOS e entender a estrutura.

#### Instalação

```bash
npx aios-core install    # Instalar AIOS
npx aios-core doctor     # Diagnóstico do sistema
npx aios-core info       # Informações do sistema
```

#### Estrutura de Pastas

```
aios-core/
├── .aios-core/                   # Core do framework
│   ├── core/                     # L1: Motor principal (NUNCA tocar)
│   ├── constitution.md           # L1: Lei fundamental
│   ├── data/                     # L3: Knowledge base, entity registry
│   │   ├── aios-kb.md            #     Base de conhecimento
│   │   ├── brainstorming-techniques.md
│   │   ├── tool-registry.yaml    #     Registo de ferramentas
│   │   └── workflow-chains.yaml  #     Cadeias de workflow
│   └── development/              # Artefactos de desenvolvimento
│       ├── agents/               #     Definições dos agentes (YAML/MD)
│       ├── tasks/                #     L2: Workflows executáveis (MD)
│       ├── templates/            #     L2: Templates de output (YAML/MD)
│       ├── checklists/           #     L2: Validações (MD)
│       ├── workflows/            #     L2: Orquestrações multi-step
│       └── scripts/              #     Scripts utilitários
├── bin/                          # L1: CLI executables
│   ├── aios.js                   #     CLI principal
│   └── aios-init.js              #     Instalador
├── .claude/                      # Configuração Claude Code
│   ├── CLAUDE.md                 #     Instruções do projecto
│   ├── settings.json             #     Deny/allow rules
│   └── rules/                    #     Regras contextuais (auto-loaded)
│       ├── agent-authority.md
│       ├── agent-handoff.md
│       ├── workflow-execution.md
│       └── ...
├── docs/                         # Documentação
│   └── stories/                  #     L4: Stories activas e completas
│       ├── active/
│       └── completed/
├── packages/                     # L4: Código do projecto
├── squads/                       # L4: Expansões de squads
└── tests/                        # L4: Testes
```

#### Ficheiros de Configuração Chave

| Ficheiro | Propósito |
|----------|-----------|
| `core-config.yaml` | Configuração do projecto (boundary, features) |
| `.claude/settings.json` | Deny/allow rules para protecção de camadas |
| `.claude/rules/*.md` | Regras contextuais carregadas automaticamente |
| `.claude/CLAUDE.md` | Instruções globais para o Claude Code |

**Exercício:** Correr `aios doctor` e interpretar cada check do output.

---

## NÍVEL 2 — ARQUITECTURA DO SISTEMA (Semanas 3-4)

### Módulo 3: Os Agentes — Quem Faz O Quê

**Objectivo:** Conhecer cada agente, o seu papel e a sua autoridade.

#### Tabela de Agentes

| Agente | Persona | Papel | Autoridade Exclusiva |
|--------|---------|-------|---------------------|
| `@pm` | Morgan | Product Manager — epics, requisitos, specs | `*create-epic`, `*execute-epic` |
| `@sm` | River | Scrum Master — criação de stories | `*draft`, `*create-story` |
| `@po` | Pax | Product Owner — validação de stories | `*validate-story-draft` (10 pontos) |
| `@architect` | Aria | Arquitecta — decisões técnicas, tech selection | Design authority |
| `@data-engineer` | Dara | Data Engineer — schema, migrations, RLS | DDL detalhado (delegado por Aria) |
| `@dev` | Dex | Developer — implementação de código | `git add/commit` (local apenas) |
| `@qa` | Quinn | QA — quality gates, testes | 7 quality checks |
| `@devops` | Gage | DevOps — push, PRs, CI/CD, MCP | **EXCLUSIVO:** `git push`, `gh pr` |
| `@analyst` | Atlas | Analyst — pesquisa, brainstorming | Research, análise |
| `@ux-design-expert` | Uma | UX Expert — UI/UX design, frontend arch | Design system |
| `@aios-master` | — | Governance — pode tudo | Override de qualquer agente |

#### Delegation Matrix

```
Qualquer agente ──→ @devops (para git push / PRs)
@architect ────────→ @data-engineer (para DDL detalhado)
Conflito ──────────→ @aios-master (mediação)
```

#### Operações Bloqueadas

| Operação | Quem pode | Quem NÃO pode |
|----------|-----------|---------------|
| `git push` | @devops | Todos os outros |
| `gh pr create` | @devops | Todos os outros |
| `*create-story` | @sm | Todos os outros |
| `*validate-story-draft` | @po | Todos os outros |
| Alterar AC/scope de story | @po | @dev (só pode marcar checkboxes) |

#### Como Activar um Agente

```
@agent-name          # Activar agente
*help                # Ver comandos do agente activo
*comando             # Executar comando
*exit                # Sair do modo agente
```

#### Agent Handoff

Ao trocar de agente, o anterior é compactado num artefacto de ~379 tokens (não carrega a persona inteira). Isto preserva:
- Story activa e branch
- Decisões tomadas
- Ficheiros modificados
- Próxima acção sugerida

**Exercício:** Activar @sm, criar um draft, trocar para @po e validar. Observar o handoff.

---

### Módulo 4: Tasks, Templates, Checklists & Workflows — A Engrenagem

**Objectivo:** Entender cada peça do sistema e quando é consultada.

#### As 4 Peças

| Peça | O que é | Localização | Quando é consultada |
|------|---------|-------------|---------------------|
| **Workflow** | Orquestração — define a sequência de tasks | `.aios-core/development/workflows/` | **PRIMEIRO** — define a ordem |
| **Task** | Workflow executável — define inputs, outputs, passos | `.aios-core/development/tasks/` | **SEGUNDO** — carregada pelo workflow |
| **Template** | Formato do output — estrutura do artefacto gerado | `.aios-core/development/templates/` | **TERCEIRO** — durante execução da task |
| **Checklist** | Validação — critérios pass/fail | `.aios-core/development/checklists/` | **QUARTO** — no final da task |

#### Ordem de Consulta (Fluxo de Execução)

```
1. WORKFLOW activado
   │  Define: sequência de tasks, decisões, loops
   │  Exemplo: Story Development Cycle
   │
   ▼
2. TASK carregada
   │  Lê: inputs, valida pre-conditions
   │  Exemplo: dev-develop-story.md
   │  Contém: passos detalhados, modos de execução
   │
   ├──▶ 3. TEMPLATE consultado (DURANTE)
   │       Formata: output da task
   │       Exemplo: story-tmpl.yaml → gera X.Y.story.md
   │
   └──▶ 4. CHECKLIST executado (NO FINAL)
           Valida: resultado da task
           Exemplo: qa-checklist.md → PASS/FAIL
           │
           ├── ✅ PASS → workflow avança para próxima task
           └── ❌ FAIL → retry, correcção, ou escalação
```

#### Exemplo Concreto: Criar uma Story

```
Workflow: Story Development Cycle (SDC)
  │
  ├── Task: create-next-story.md          ← @sm executa
  │   ├── Template: story-tmpl.yaml       ← formata a story
  │   └── Checklist: story-checklist.md   ← valida estrutura
  │
  ├── Task: validate-next-story.md        ← @po executa
  │   └── Checklist: 10-point validation  ← GO/NO-GO
  │
  ├── Task: dev-develop-story.md          ← @dev executa
  │   └── Checklist: code quality checks  ← lint, typecheck, tests
  │
  └── Task: qa-gate.md                    ← @qa executa
      └── Checklist: 7 quality checks     ← PASS/FAIL/CONCERNS
```

#### Anatomia de uma Task

```markdown
---
id: task-name
name: Human Readable Name
agent: agent-id
category: development
complexity: medium
---

# Task Name

## Input (o que recebe)
## Output (o que produz)
## Process (passos a executar)
## Checklist (pre/post-conditions)
## Templates (outputs formatados)
## Error Handling (o que fazer quando falha)
```

#### Anatomia de um Template

```yaml
# template-name-tmpl.yaml
name: Template Name
version: 1.0.0
output_format: markdown|yaml|json
sections:
  - header
  - content
  - metadata
```

#### Anatomia de uma Checklist

```markdown
# Checklist Name

## Pre-conditions (antes de executar)
- [ ] Condição 1
- [ ] Condição 2

## Post-conditions (depois de executar)
- [ ] Resultado 1
- [ ] Resultado 2

## Acceptance Criteria (critérios de aceitação)
- [ ] Critério 1
```

**Exercício:** Abrir uma task real (`dev-develop-story.md`), identificar os templates e checklists que referencia, e traçar o fluxo completo.

---

### Módulo 5: Os 4 Workflows Principais

**Objectivo:** Dominar os workflows que governam todo o trabalho no AIOS.

#### Workflow 1: Story Development Cycle (SDC) — O Principal

O workflow usado para **todo o desenvolvimento**. 4 fases obrigatórias.

```
Phase 1: CREATE           Phase 2: VALIDATE        Phase 3: IMPLEMENT       Phase 4: QA GATE
┌──────────────┐         ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│  @sm River   │────────▶│  @po Pax     │────────▶│  @dev Dex    │────────▶│  @qa Quinn   │
│              │         │              │         │              │         │              │
│ Task:        │         │ Task:        │         │ Task:        │         │ Task:        │
│ create-next  │         │ validate-next│         │ dev-develop  │         │ qa-gate.md   │
│ -story.md    │         │ -story.md    │         │ -story.md    │         │              │
│              │         │              │         │              │         │              │
│ Output:      │         │ Checklist:   │         │ Modes:       │         │ 7 checks     │
│ X.Y.story.md │         │ 10 pontos    │         │ Interactive  │         │              │
│              │         │              │         │ YOLO         │         │ PASS         │
│ Status:      │         │ GO (≥7)      │         │ Pre-Flight   │         │ FAIL         │
│ Draft        │         │ NO-GO (<7)   │         │              │         │ CONCERNS     │
│              │         │              │         │ Status:      │         │ WAIVED       │
│              │         │              │         │ InProgress   │         │              │
└──────────────┘         └──────────────┘         └──────────────┘         └──────────────┘
                               │                                                 │
                               ▼ NO-GO                                           ▼ FAIL
                         Fixes listados                                    Volta ao @dev
                         volta a Phase 1                                   com feedback
```

**Transições de Status da Story:**
```
Draft → Ready (após PO validate GO) → InProgress (dev começa) → InReview (QA) → Done (QA PASS)
```

#### Workflow 2: QA Loop — Iterativo

Ciclo automático de review/fix após QA Gate inicial.

```
@qa review → verdict
  │
  ├── APPROVE → Done ✅
  ├── REJECT → @dev corrige → re-review (max 5 iterações)
  └── BLOCKED → Escalação imediata a @aios-master
```

**Triggers de escalação:**
- `max_iterations_reached` (5)
- `verdict_blocked`
- `fix_failure`
- `manual_escalate`

#### Workflow 3: Spec Pipeline — Pré-implementação

Transforma requisitos informais em spec executável. A complexidade determina quantas fases.

| Score | Classe | Fases |
|-------|--------|-------|
| ≤ 8 | SIMPLE | gather → spec → critique (3 fases) |
| 9-15 | STANDARD | gather → assess → research → spec → critique → plan (6 fases) |
| ≥ 16 | COMPLEX | 6 fases + ciclo de revisão |

```
@pm gather → @architect assess → @analyst research → @pm spec → @qa critique → @architect plan
```

**Gate Constitutional (Art. IV):** Tudo no spec deve rastrear a FR-*, NFR-*, CON-* ou research finding. Nada inventado.

#### Workflow 4: Brownfield Discovery — 10 Fases

Assessment completo de tech debt para projectos existentes.

```
COLECTA (1-3)                    VALIDAÇÃO (4-7)                    FINALIZAÇÃO (8-10)
Phase 1: @architect              Phase 4: @architect                Phase 8: @architect
  → system-architecture.md         → tech-debt-DRAFT.md              → tech-debt FINAL
Phase 2: @data-engineer          Phase 5: @data-engineer            Phase 9: @analyst
  → SCHEMA.md + DB-AUDIT.md        → db-specialist-review.md         → REPORT executivo
Phase 3: @ux                     Phase 6: @ux                       Phase 10: @pm
  → frontend-spec.md               → ux-specialist-review.md          → Epic + stories
                                 Phase 7: @qa
                                   → QA Gate
                                   APPROVED → Phase 8
                                   NEEDS WORK → volta Phase 4
```

**Exercício:** Escolher o workflow correcto para cada cenário:
1. Bug simples numa feature existente
2. Nova feature complexa com API externa
3. Entrar num projecto legado pela primeira vez
4. QA encontrou 3 issues no código

---

## NÍVEL 3 — SEQUÊNCIAS PRÁTICAS (Semanas 4-5)

### Módulo 6: Greenfield — Projecto do Zero

**Objectivo:** Sequência completa para iniciar um projecto novo.

```
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 1: SETUP                                                       │
│                                                                     │
│   npx aios-core install              ← instalar framework           │
│   npx aios-core doctor               ← validar ambiente             │
│   @devops *environment-bootstrap     ← git init, remote, CI/CD      │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FASE 2: DEFINIÇÃO                                                   │
│                                                                     │
│   @pm *create-epic                   ← define epic + PRD            │
│   @architect                         ← decisões de arquitectura     │
│   @data-engineer                     ← schema inicial (se BD)       │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FASE 3: SPEC (se complexo)                                          │
│                                                                     │
│   @pm gather                                                        │
│     → @architect assess                                             │
│       → @analyst research                                           │
│         → @pm spec                                                  │
│           → @qa critique                                            │
│             → @architect plan                                       │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FASE 4: STORIES (ciclo repetido por story)                          │
│                                                                     │
│   @sm *draft                         ← cria story do epic           │
│   @po *validate-story-draft          ← valida (GO/NO-GO)           │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FASE 5: IMPLEMENTAÇÃO (por story)                                   │
│                                                                     │
│   @dev *develop                      ← implementa código            │
│   @qa *qa-gate                       ← 7 quality checks             │
│     └── se FAIL: @qa *qa-loop        ← ciclo fix/review (max 5)    │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FASE 6: ENTREGA                                                     │
│                                                                     │
│   @devops *push                      ← push + criar PR              │
│   @devops                            ← merge, release               │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ REPETIR Fases 4-6 para cada story do epic                           │
└─────────────────────────────────────────────────────────────────────┘
```

**Exercício prático:** Criar um projecto SaaS simples (ex: todo app) seguindo toda a sequência.

---

### Módulo 7: Brownfield — Projecto Existente

**Objectivo:** Sequência completa para adoptar AIOS num projecto legado.

```
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 1: SETUP                                                       │
│                                                                     │
│   npx aios-core install              ← instalar AIOS no projecto   │
│   npx aios-core doctor               ← validar ambiente             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FASE 2: DISCOVERY (Brownfield — 10 fases)                           │
│                                                                     │
│   DATA COLLECTION                                                   │
│   Phase 1:  @architect               ← mapear arquitectura          │
│   Phase 2:  @data-engineer           ← auditar schema + DB          │
│   Phase 3:  @ux                      ← documentar frontend          │
│                                                                     │
│   DRAFT & VALIDATION                                                │
│   Phase 4:  @architect               ← draft tech debt              │
│   Phase 5:  @data-engineer           ← review DB                    │
│   Phase 6:  @ux                      ← review UX                    │
│   Phase 7:  @qa                      ← QA Gate                      │
│             APPROVED → Phase 8                                      │
│             NEEDS WORK → volta Phase 4                              │
│                                                                     │
│   FINALIZATION                                                      │
│   Phase 8:  @architect               ← tech debt assessment FINAL   │
│   Phase 9:  @analyst                 ← relatório executivo           │
│   Phase 10: @pm                      ← criar epic + stories         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ FASE 3: DESENVOLVIMENTO (igual a Greenfield a partir daqui)         │
│                                                                     │
│   @sm *draft → @po *validate → @dev *develop → @qa *qa-gate        │
│     → @devops *push                                                 │
│                                                                     │
│   Repetir para cada story do epic gerado no Phase 10                │
└─────────────────────────────────────────────────────────────────────┘
```

**Exercício prático:** Pegar num projecto pessoal existente, instalar AIOS e correr as 10 fases de discovery.

---

### Módulo 8: Greenfield vs Brownfield — Comparação

| Aspecto | Greenfield | Brownfield |
|---------|-----------|------------|
| Primeiro passo | `*environment-bootstrap` | Brownfield Discovery (10 fases) |
| Tempo de setup | 1-2 horas | 1-2 dias (discovery completo) |
| Quem lidera início | @pm (cria epic) | @architect (assessment) |
| Risco principal | Over-engineering | Tech debt oculta |
| Quando usar Spec Pipeline | Features complexas (score ≥9) | Sempre recomendado no início |
| Output inicial | Epic → Stories directo | Tech Debt Report → Epic → Stories |
| Agentes envolvidos no setup | @pm, @architect, @devops | Todos os 10 agentes |
| Primeira story | Imediata após epic | Após 10 fases de discovery |

**Quando escolher cada um:**
- **Greenfield:** Projecto novo, sem código existente, sem legacy
- **Brownfield:** Projecto existente com código, qualquer refactoring significativo

---

## NÍVEL 4 — AVANÇADO (Semanas 5-6)

### Módulo 9: Squads & Expansões

**Objectivo:** Criar equipas especializadas de agentes.

- O que são squads e quando usar
- Squad creator — `@squad-creator`
- Mind cloning — capturar padrões de pensamento
- Squads disponíveis:
  - Design System Squad (Brad Frost, Dan Mall, Dave Malouf)
  - Copy Chief Squad (24 copywriters)
  - Cyber Chief Squad (6 especialistas de segurança)
  - Traffic Masters Squad (7 especialistas de paid traffic)
- Criar squads customizados para o teu domínio

**Exercício:** Criar um squad customizado para o teu projecto.

---

### Módulo 10: Customização do Framework

**Objectivo:** Estender o AIOS sem modificar o core.

#### Criar Agentes Custom

```yaml
# .aios-core/development/agents/my-agent.md
agent:
  name: MyAgent
  id: my-agent
  title: Custom Agent
persona:
  role: Specialist in X
  style: Direct, focused
commands:
  - name: my-command
    description: Does something specific
```

#### Criar Tasks Custom

```markdown
# .aios-core/development/tasks/my-task.md
---
id: my-task
agent: my-agent
---
## Input
## Process
## Checklist
```

#### Criar Templates Custom

```yaml
# .aios-core/development/templates/my-tmpl.yaml
name: My Template
sections:
  - header
  - content
```

#### Rules System

- Ficheiros em `.claude/rules/` são carregados automaticamente
- Rules com `paths:` no frontmatter só carregam para ficheiros específicos
- Adicionar rules project-specific sem tocar no core

**Exercício:** Criar um agente custom com 2 comandos, 1 task e 1 template.

---

### Módulo 11: AIOS em Produção

**Objectivo:** Usar o AIOS em projectos reais com CI/CD.

- Pre-push quality gates: `npm run lint` + `npm run typecheck` + `npm test`
- @devops e operações exclusivas
- MCP & integrações:
  - Docker Gateway para MCPs containerizados
  - EXA para pesquisa web
  - Context7 para documentação de libraries
  - Playwright para testes de browser
- `aios graph` — visualização de dependências:
  - `aios graph --deps` (ASCII)
  - `aios graph --deps --format=html` (interactivo)
  - `aios graph --stats` (estatísticas)
- Monitorização e debug:
  - `AIOS_DEBUG=true`
  - Logs em `.aios/logs/`

**Exercício:** Configurar pipeline completo: dev → QA gate → push → PR automático.

---

## 🏆 PROJECTO FINAL

**Opção A — Greenfield:**
Construir uma app completa (ex: SaaS de gestão de tarefas) usando toda a sequência:
1. Setup + epic
2. Spec pipeline para features complexas
3. Pelo menos 5 stories completas (SDC)
4. QA loop em pelo menos 2 stories
5. Deploy via @devops

**Opção B — Brownfield:**
Adoptar AIOS num projecto existente:
1. Brownfield discovery completo (10 fases)
2. Tech debt report
3. Epic gerado com pelo menos 5 stories
4. Implementar 3 stories com SDC
5. Demonstrar melhoria nas métricas

---

## Apêndices

### A. Glossário

| Termo | Definição |
|-------|-----------|
| SDC | Story Development Cycle — workflow principal de 4 fases |
| QA Loop | Ciclo iterativo de review/fix (max 5) |
| Spec Pipeline | Workflow de transformação de requisitos em spec |
| Brownfield Discovery | Assessment de 10 fases para projectos existentes |
| Constitution | Lei fundamental do AIOS com 6 artigos |
| Gate | Checkpoint obrigatório que bloqueia se falhar |
| Handoff | Artefacto compacto de transição entre agentes |

### B. Cheat Sheet de Comandos

```bash
# Setup
npx aios-core install
npx aios-core doctor
npx aios-core info

# Agentes
@agent-name          # activar
*help                # comandos
*exit                # sair

# Desenvolvimento
npm run dev
npm test
npm run lint
npm run typecheck
npm run build

# Graph
aios graph --deps
aios graph --stats
aios graph --deps --format=html
```

### C. Mapa de Agentes → Comandos Principais

```
@pm     → *create-epic, *execute-epic
@sm     → *draft, *create-story
@po     → *validate-story-draft
@dev    → *develop
@qa     → *qa-gate, *qa-loop
@devops → *push, *environment-bootstrap
@analyst → *brainstorm, *perform-market-research
@architect → decisões de arquitectura
@data-engineer → schema, migrations
@ux     → design system, frontend
```

---

*Gerado por Atlas (Analyst Agent) — Synkra AIOS*
*2026-03-03*
