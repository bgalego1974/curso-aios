---
title: "Cheat Sheet — Nível 3"
description: Referência rápida das sequências Greenfield e Brownfield.
sidebar:
  order: 99
---

## Sequência Greenfield (6 Fases)

| Fase | Acção | Agente | Comando |
|------|-------|--------|---------|
| 1. Setup | Instalar + bootstrap | @devops | `npx aios-core install` → `*environment-bootstrap` |
| 2. Definição | Epic + arquitectura | @pm, @architect | `*create-epic` |
| 3. Spec | Spec pipeline (se complexo) | @pm, @architect, @analyst, @qa | `*gather-requirements` → `*write-spec` |
| 4. Stories | Criar + validar | @sm, @po | `*draft` → `*validate-story-draft` |
| 5. Implementação | Desenvolver + QA | @dev, @qa | `*develop` → `*qa-gate` |
| 6. Entrega | Push + PR | @devops | `*push` |

**Repetir fases 4-6 por story.**

## Sequência Brownfield (3 Fases)

### Fase 1: Setup
```bash
npx aios-core install && npx aios-core doctor
```

### Fase 2: Discovery (10 fases)

| Grupo | Phases | Agentes | Output |
|-------|--------|---------|--------|
| **Colecta** | 1-3 | @architect, @data-engineer, @ux | architecture.md, SCHEMA.md, frontend-spec.md |
| **Validação** | 4-7 | @architect, @data-engineer, @ux, @qa | tech-debt-DRAFT.md + reviews + QA Gate |
| **Finalização** | 8-10 | @architect, @analyst, @pm | tech-debt FINAL + report + epic/stories |

**Phase 7 QA Gate:** APPROVED → Phase 8 | NEEDS WORK → volta Phase 4

### Fase 3: Desenvolvimento
SDC normal (igual a Greenfield fases 4-6).

## Árvore de Decisão

```
Tenho código existente?
├── NÃO → Greenfield
└── SIM → Alterações significativas?
    ├── NÃO (só features novas) → Instala AIOS + SDC directo
    ├── SIM (refactoring/migração) → Brownfield Discovery
    └── Não sei → Brownfield (mais seguro)
```

## Comandos-Chave por Fase

```bash
# Setup
npx aios-core install
npx aios-core doctor
@devops *environment-bootstrap

# Definição
@pm *create-epic
@architect                    # decisões de stack

# Stories
@sm *draft
@po *validate-story-draft

# Implementação
@dev *develop
@qa *qa-gate
@qa *qa-loop                  # se FAIL

# Entrega
@devops *push
```
