---
title: "Cheat Sheet — Nível 4 & Glossário"
description: Referência rápida do nível avançado e glossário completo.
sidebar:
  order: 99
---

## Squads

```
@squad-creator               # Criar squad customizado
squads/{name}/agents/        # Agentes do squad
squads/{name}/tasks/         # Tasks específicas
```

**Squads existentes:** Design System, Copy Chief, Cyber Chief, Traffic Masters

## Anatomia de Componentes Custom

### Agente
```yaml
# .aios-core/development/agents/{name}.md
agent:
  name: Name
  id: agent-id
  title: Title
persona:
  role: Role description
  core_principles: [...]
commands:
  - name: command-name
    description: What it does
dependencies:
  tasks: [task-file.md]
```

### Task
```markdown
<!-- .aios-core/development/tasks/{name}.md -->
---
id: task-id
agent: agent-id
complexity: low|medium|high
---
## Input
## Output
## Process
## Checklist
## Error Handling
```

### Template
```yaml
# .aios-core/development/templates/{name}-tmpl.yaml
name: Template Name
version: 1.0.0
output_format: markdown
sections:
  - name: section-name
    content: |
      Content with {placeholders}
```

### Checklist
```markdown
<!-- .aios-core/development/checklists/{name}.md -->
## Pre-conditions
- [ ] Check 1
## Post-conditions
- [ ] Check 2
## Acceptance Criteria
- [ ] Criterion 1
```

## Pipeline de Produção

```
@dev commit → @qa *qa-gate (7 checks) → @devops *push (pre-push gates) → PR
```

**Pre-push gates obrigatórios:**
```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm test            # Jest
```

## `aios graph`

| Comando | Output |
|---------|--------|
| `aios graph --deps` | ASCII dependency tree |
| `aios graph --deps --format=json` | JSON |
| `aios graph --deps --format=html` | Interactivo (browser) |
| `aios graph --deps --format=mermaid` | Mermaid diagram |
| `aios graph --stats` | Estatísticas de dependências |

## MCP Tiers

| Tier | Exemplos | Quando |
|------|----------|--------|
| 1 (Sempre) | Read, Write, Bash, Grep, Glob | Sempre disponíveis |
| 2 (Com agente) | Context7, git, CodeRabbit | Na activação do agente |
| 3 (Sob demanda) | EXA, Playwright, Apify | Via Docker Gateway |

## Debug

```bash
export AIOS_DEBUG=true           # Activar debug
tail -f .aios/logs/agent.log     # Ver logs
```

## Rules System

```markdown
<!-- .claude/rules/my-rule.md -->
---
paths:                          # Opcional: só carrega para estes ficheiros
  - "packages/auth/**"
---
# Rule content here
```

- Sem `paths:` → carrega sempre
- Com `paths:` → carrega só para ficheiros matching

---

## Glossário

| Termo | Definição |
|-------|-----------|
| **AC** | Acceptance Criteria — critérios mensuráveis que definem quando uma story está "done" |
| **Agent** | Agente AI especializado com persona, papel e autoridade exclusiva |
| **Agent Handoff** | Artefacto compacto (~379 tokens) que preserva contexto ao trocar de agente |
| **Boundary** | Sistema de 4 camadas (L1-L4) que protege o core do framework |
| **Brownfield** | Cenário de adopção do AIOS num projecto existente com código |
| **Checklist** | Ficheiro de validação com critérios pass/fail executado no final de uma task |
| **Constitution** | Lei fundamental do AIOS com 6 artigos inegociáveis |
| **Conventional Commits** | Convenção de mensagens de commit: `feat:`, `fix:`, `docs:`, etc. |
| **Delegation** | Transferência de responsabilidade entre agentes (ex: @dev → @devops para push) |
| **Deny Rules** | Regras em `.claude/settings.json` que bloqueiam edição de ficheiros L1/L2 |
| **Discovery** | Assessment formal de 10 fases para projectos brownfield |
| **Epic** | Agrupamento de stories relacionadas com um objectivo comum |
| **FR** | Functional Requirement — requisito funcional formal (FR-001, FR-002...) |
| **Gate** | Checkpoint obrigatório que bloqueia avanço se falhar |
| **Greenfield** | Cenário de criação de projecto novo do zero com AIOS |
| **Handoff** | Ver Agent Handoff |
| **IDS** | Incremental Development System — sistema de registo e reutilização de entidades |
| **MCP** | Model Context Protocol — protocolo de integração com ferramentas externas |
| **Mind Cloning** | Técnica de captura de padrões de pensamento para modelar agentes de squad |
| **NFR** | Non-Functional Requirement — requisito não-funcional (performance, segurança, etc.) |
| **PRD** | Product Requirements Document — documento de requisitos do produto |
| **QA Gate** | Quality gate com 7 checks obrigatórios executado pelo @qa |
| **QA Loop** | Ciclo iterativo de review/fix após QA Gate (max 5 iterações) |
| **SDC** | Story Development Cycle — workflow principal de 4 fases |
| **Spec Pipeline** | Workflow de transformação de requisitos informais em spec executável |
| **Squad** | Equipa de agentes especializados num domínio específico |
| **Story** | Unidade de trabalho com user story, AC e status — base do desenvolvimento |
| **Task** | Workflow executável com inputs, outputs, process e checklist |
| **Template** | Ficheiro que define o formato de output de uma task |
| **Tier** | Nível de disponibilidade de ferramentas (1=sempre, 2=com agente, 3=sob demanda) |
| **WAIVED** | Verdict de QA Gate que faz bypass justificado (raro, requer justificação) |
| **Workflow** | Orquestração que define sequência de tasks, decisões e loops |
| **YOLO Mode** | Modo de execução autónomo sem confirmações passo-a-passo |
