---
title: "Cheat Sheet — Nível 1"
description: Referência rápida dos fundamentos do AIOS.
sidebar:
  order: 99
---

## Constitution — 6 Artigos

| Art. | Princípio | Severidade | Resumo |
|------|-----------|------------|--------|
| I | CLI First | NON-NEGOTIABLE | CLI é fonte da verdade. UI apenas observa. |
| II | Agent Authority | NON-NEGOTIABLE | Cada agente tem domínio exclusivo. |
| III | Story-Driven | MUST | Sem story, sem código. |
| IV | No Invention | MUST | Tudo rastreia a um requisito formal. |
| V | Quality First | MUST | Quality gates obrigatórios. |
| VI | Absolute Imports | SHOULD | Imports absolutos, nunca relativos. |

## Hierarquia

```
CLI First → Observability Second → UI Third
```

## 4 Camadas (L1-L4)

| Camada | Mutabilidade | Conteúdo |
|--------|-------------|----------|
| 🔴 **L1** Core | NUNCA | `.aios-core/core/`, `constitution.md`, `bin/` |
| 🟠 **L2** Templates | NUNCA (extend) | `tasks/`, `templates/`, `checklists/`, `workflows/` |
| 🟡 **L3** Config | Mutável | `.aios-core/data/`, `core-config.yaml` |
| 🟢 **L4** Runtime | SEMPRE | `docs/stories/`, `packages/`, `tests/` |

## Instalação

```bash
npx aios-core install    # Instalar
npx aios-core doctor     # Diagnóstico
npx aios-core info       # Info do sistema
```

## Estrutura de Pastas (Simplificada)

```
.aios-core/
├── core/                # L1: Motor (NUNCA tocar)
├── constitution.md      # L1: Lei fundamental
├── data/                # L3: Knowledge base
└── development/
    ├── agents/          # Definições dos agentes
    ├── tasks/           # L2: Workflows executáveis
    ├── templates/       # L2: Formatos de output
    ├── checklists/      # L2: Validações
    └── workflows/       # L2: Orquestrações

.claude/
├── CLAUDE.md            # Instruções do projecto
├── settings.json        # Deny/allow rules
└── rules/               # Regras contextuais (auto-loaded)

core-config.yaml         # L3: Config do projecto
```

## Ficheiros de Config

| Ficheiro | Propósito |
|----------|-----------|
| `core-config.yaml` | Config projecto, boundary protection |
| `.claude/settings.json` | Deny/allow rules (protege L1/L2) |
| `.claude/rules/*.md` | Regras contextuais auto-loaded |
| `.claude/CLAUDE.md` | Instruções globais |
