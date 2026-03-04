---
title: "Módulo 2: Instalação & Anatomia"
description: Instalar o AIOS e entender a estrutura do projecto.
sidebar:
  order: 2
---

## Pré-requisitos

| Requisito | Versão Mínima | Como verificar |
|-----------|---------------|----------------|
| **Node.js** | 18+ | `node --version` |
| **npm** | 9+ | `npm --version` |
| **Git** | 2.30+ | `git --version` |
| **Claude Code** | Última versão | `claude --version` |

Se algum faltar, instala antes de prosseguir.

---

## Instalação Passo-a-Passo

### 1. Instalar o AIOS

```bash
npx aios-core install
```

Este comando:
- Cria a pasta `.aios-core/` com o core do framework
- Gera `.claude/CLAUDE.md` com instruções do projecto
- Configura `.claude/settings.json` com deny/allow rules
- Cria `.claude/rules/` com regras contextuais
- Gera `core-config.yaml` com configuração do projecto

### 2. Diagnóstico do Sistema

```bash
npx aios-core doctor
```

O `doctor` verifica:
- ✅ Node.js version compatível
- ✅ `.aios-core/` existe e está íntegro
- ✅ Constitution presente
- ✅ Agentes válidos (YAML parse OK)
- ✅ Deny rules configuradas
- ✅ Core config válido

Se algum check falhar, o doctor indica o problema e a solução.

### 3. Informações do Sistema

```bash
npx aios-core info
```

Mostra: versão do AIOS, número de agentes/tasks/templates/checklists/workflows, estado do boundary protection e user profile activo.

---

## Tour pela Estrutura de Pastas

```
meu-projecto/
├── .aios-core/                       # 🔒 Core do framework
│   ├── core/                         # L1: Motor principal (NUNCA tocar)
│   │   ├── orchestration/            #     Engine de orquestração
│   │   ├── config/                   #     Config resolver
│   │   └── memory/                   #     Camada de memória
│   ├── constitution.md               # L1: Lei fundamental (6 artigos)
│   ├── data/                         # L3: Knowledge base
│   │   ├── aios-kb.md                #     Base de conhecimento
│   │   ├── tool-registry.yaml        #     Registo de ferramentas (3 Tiers)
│   │   └── workflow-chains.yaml      #     Cadeias de workflow
│   └── development/                  # Artefactos de desenvolvimento
│       ├── agents/                   #     Definições dos 10 agentes
│       ├── tasks/                    # L2: Workflows executáveis
│       ├── templates/                # L2: Templates de output
│       ├── checklists/               # L2: Validações
│       ├── workflows/                # L2: Orquestrações multi-step
│       └── scripts/                  #     Scripts utilitários
├── .claude/                          # ⚙️ Configuração Claude Code
│   ├── CLAUDE.md                     #     Instruções do projecto (gerado)
│   ├── settings.json                 #     Deny/allow rules
│   └── rules/                        #     Regras contextuais (auto-loaded)
│       ├── agent-authority.md        #     Quem pode fazer o quê
│       ├── agent-handoff.md          #     Protocolo de transição
│       ├── workflow-execution.md     #     Regras de workflows
│       ├── mcp-usage.md              #     Regras de MCP
│       └── tool-examples.md          #     Exemplos de ferramentas
├── bin/                              # L1: CLI executables
│   ├── aios.js                       #     CLI principal
│   └── aios-init.js                  #     Instalador
├── docs/stories/                     # L4: Stories de desenvolvimento
│   ├── active/                       #     Stories em progresso
│   └── completed/                    #     Stories concluídas
├── packages/                         # L4: Código do projecto
├── squads/                           # L4: Expansões de squads
├── tests/                            # L4: Testes
└── core-config.yaml                  # L3: Configuração do projecto
```

---

## Ficheiros de Configuração Chave

### `core-config.yaml`

```yaml
project:
  name: meu-projecto
  version: 1.0.0

boundary:
  frameworkProtection: true    # Deny rules activas (L1/L2 protegidos)

features:
  ids: true                    # Incremental Development System
  qaLoop: true                 # QA Loop automático
```

### `.claude/settings.json`

```json
{
  "deny": [
    ".aios-core/core/**",
    ".aios-core/constitution.md",
    "bin/aios.js",
    "bin/aios-init.js"
  ],
  "allow": [
    ".aios-core/data/**",
    "core-config.yaml"
  ]
}
```

- **deny:** Ficheiros que nenhum agente pode modificar (L1/L2)
- **allow:** Excepções explícitas dentro de paths protegidos (L3)

### `.claude/rules/` — Regras Contextuais

Ficheiros em `.claude/rules/` são **carregados automaticamente** pelo Claude Code:

| Ficheiro | Quando carrega | O que faz |
|----------|----------------|-----------|
| `agent-authority.md` | Sempre | Define quem pode fazer o quê |
| `agent-handoff.md` | Na troca de agente | Protocolo de transição |
| `workflow-execution.md` | Na execução de workflows | Regras dos 4 workflows |
| `mcp-usage.md` | Ao usar ferramentas MCP | Prioridade de ferramentas |
| `tool-examples.md` | Na selecção de ferramentas | Exemplos concretos de uso |

Rules com frontmatter `paths:` só carregam para ficheiros específicos:

```markdown
---
paths:
  - "packages/auth/**"
---
# Auth Module Rules
Regras específicas para o módulo de auth...
```

---

## Troubleshooting — 5 Erros Comuns

### 1. `npx aios-core install` falha com "EACCES"

**Causa:** Permissões insuficientes no directório.
**Solução:** Verifica permissões da pasta ou corre com privilégios adequados.

### 2. `aios doctor` reporta "Constitution not found"

**Causa:** Instalação incompleta ou `.aios-core/` corrompido.
**Solução:** Remove `.aios-core/` e reinstala: `npx aios-core install`.

### 3. Deny rules não funcionam

**Causa:** `.claude/settings.json` ausente ou malformado.
**Solução:** Verifica que o ficheiro existe e tem JSON válido. Reinstala se necessário.

### 4. `node --version` mostra versão < 18

**Causa:** Node.js desactualizado.
**Solução:** Usa `nvm install 18` ou instala a versão LTS mais recente.

### 5. Agentes não activam (`@agent-name` não responde)

**Causa:** Ficheiros de agente ausentes em `.aios-core/development/agents/`.
**Solução:** Verifica que os ficheiros `.md` dos agentes existem. Reinstala se necessário.

---

## Exercício

**Corre `npx aios-core doctor` e interpreta cada check do output.**

Para cada linha:
1. O que está a verificar?
2. Porque é importante?
3. O que aconteceria se falhasse?

Exemplo:
```
✅ Constitution present
→ Verifica que .aios-core/constitution.md existe
→ Sem Constitution, os gates automáticos não funcionam
→ Se falhar: nenhum artigo é enforced, o sistema opera sem regras
```
