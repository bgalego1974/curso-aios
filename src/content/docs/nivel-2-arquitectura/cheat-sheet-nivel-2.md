---
title: "Cheat Sheet — Nível 2"
description: Referência rápida de agentes, engrenagem e workflows.
sidebar:
  order: 99
---

## Mapa de Agentes

| Agente | Persona | Papel | Autoridade Exclusiva |
|--------|---------|-------|---------------------|
| `@pm` | Morgan | Product Manager | `*create-epic`, `*execute-epic` |
| `@sm` | River | Scrum Master | `*draft`, `*create-story` |
| `@po` | Pax | Product Owner | `*validate-story-draft` |
| `@architect` | Aria | Arquitecta | Design authority |
| `@data-engineer` | Dara | Data Engineer | DDL, migrations, RLS |
| `@dev` | Dex | Developer | `git add/commit` (local) |
| `@qa` | Quinn | QA | 7 quality checks |
| `@devops` | Gage | DevOps | `git push`, `gh pr` **(EXCLUSIVO)** |
| `@analyst` | Atlas | Analyst | Research, brainstorming |
| `@ux` | Uma | UX Expert | Design system |

## Delegação

```
Qualquer agente ──→ @devops (push/PRs)
@architect ────────→ @data-engineer (DDL)
Conflito ──────────→ @aios-master (mediação)
```

## Activar Agentes

```
@agent-name     # Activar
*help           # Comandos
*status         # Contexto actual
*exit           # Sair
```

## Ordem de Consulta (Engrenagem)

```
1. WORKFLOW  → define sequência de tasks
2. TASK      → define inputs, outputs, passos
3. TEMPLATE  → formata output da task
4. CHECKLIST → valida resultado (PASS/FAIL)
```

## 4 Workflows

### SDC (Story Development Cycle)
```
@sm create → @po validate (GO/NO-GO) → @dev implement → @qa gate (PASS/FAIL)
```

### QA Loop
```
@qa review → APPROVE (done) / REJECT (@dev fix, max 5) / BLOCKED (escalação)
```

### Spec Pipeline
```
@pm gather → @architect assess → @analyst research → @pm spec → @qa critique → @architect plan
```
- SIMPLE (≤8): 3 fases | STANDARD (9-15): 6 fases | COMPLEX (≥16): 6 + revisão

### Brownfield Discovery
```
Colecta (1-3) → Validação (4-7) → Finalização (8-10)
Phase 7: QA Gate → APPROVED (avança) / NEEDS WORK (volta Phase 4)
```

## Tabela de Decisão

| Cenário | Workflow |
|---------|----------|
| Nova story | SDC |
| QA deu issues | QA Loop |
| Feature complexa | Spec Pipeline → SDC |
| Projecto existente | Brownfield Discovery |
| Bug fix simples | SDC (YOLO) |
