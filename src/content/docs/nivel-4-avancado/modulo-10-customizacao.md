---
title: "Módulo 10: Customização"
description: Estender o AIOS sem modificar o core.
sidebar:
  order: 1
---

O AIOS é extensível by design. Podes criar agentes, tasks, templates e checklists custom — desde que respeites o boundary L1-L4. Este módulo é um tutorial completo de como estender o framework.

---

## Regra Fundamental: Boundary L1-L4

Antes de customizar, relembra:

| Camada | Podes modificar? | Podes estender? |
|--------|-------------------|-----------------|
| **L1** Core | ❌ Nunca | ❌ Nunca |
| **L2** Templates/Tasks | ❌ Nunca | ✅ Criar novos |
| **L3** Config | ✅ Sim | ✅ Sim |
| **L4** Runtime | ✅ Sempre | ✅ Sempre |

**Tudo o que crias vai para L2 (extend) ou L4 (runtime).** Nunca modificas o que já existe em L1/L2.

---

## Tutorial 1: Criar Agente Custom

### Estrutura do ficheiro

Cria um ficheiro em `.aios-core/development/agents/`:

```yaml
# .aios-core/development/agents/security-auditor.md

agent:
  name: SecAudit
  id: security-auditor
  title: Security Auditor
  icon: 🔒

persona:
  role: Application Security Specialist
  style: Methodical, thorough, risk-aware
  identity: Security expert focused on OWASP Top 10 and secure coding
  core_principles:
    - Never bypass security checks
    - Document all findings with severity
    - Provide remediation steps for every issue

persona_profile:
  archetype: Guardian
  communication:
    tone: serious
    greeting_levels:
      minimal: '🔒 security-auditor ready'
      named: '🔒 SecAudit (Guardian) ready. Security first!'
      archetypal: '🔒 SecAudit the Guardian ready to protect!'
    signature_closing: '— SecAudit, protegendo o código 🛡️'

commands:
  - name: help
    description: 'Show available commands'
  - name: scan
    args: '{path}'
    description: 'Scan codebase for security issues'
  - name: audit-deps
    description: 'Audit npm dependencies for vulnerabilities'
  - name: check-secrets
    description: 'Check for hardcoded secrets in code'
  - name: exit
    description: 'Exit security auditor mode'

dependencies:
  tasks:
    - security-scan.md
    - audit-dependencies.md
  checklists:
    - security-checklist.md
```

### Campos obrigatórios

| Campo | Propósito |
|-------|-----------|
| `agent.name` | Nome da persona |
| `agent.id` | Identificador único (usado em `@{id}`) |
| `agent.title` | Título descritivo |
| `persona.role` | Papel do agente |
| `persona.core_principles` | Princípios que guiam decisões |
| `commands` | Lista de comandos disponíveis |

### Activar

```
@security-auditor          # Activa o agente
*help                      # Ver comandos
*scan packages/auth/       # Executar scan
```

---

## Tutorial 2: Criar Task Custom

### Estrutura do ficheiro

Cria em `.aios-core/development/tasks/`:

```markdown
<!-- .aios-core/development/tasks/security-scan.md -->
---
id: security-scan
name: Security Scan
agent: security-auditor
category: security
complexity: medium
---

# Security Scan

## Input
- Target path (directório ou ficheiro)
- Scan type: full | quick | owasp-only

## Output
- `security-report.md` com findings
- Severity: CRITICAL | HIGH | MEDIUM | LOW | INFO

## Process

### 1. Preparation
- [ ] Validate target path exists
- [ ] Determine scan scope (files count)

### 2. Static Analysis
- [ ] Check for hardcoded secrets (API keys, passwords, tokens)
- [ ] Check for SQL injection patterns
- [ ] Check for XSS vulnerabilities
- [ ] Check for command injection
- [ ] Check for path traversal

### 3. Dependency Check
- [ ] Run `npm audit`
- [ ] Flag dependencies with known CVEs
- [ ] Check for outdated packages with security patches

### 4. Report
- [ ] Generate findings list with severity
- [ ] Provide remediation steps for each finding
- [ ] Calculate overall risk score

## Checklist

### Pre-conditions
- [ ] Target path is accessible
- [ ] Agent has read access to files

### Post-conditions
- [ ] Report generated with all findings
- [ ] Each finding has severity + remediation
- [ ] No false positives left unvalidated

## Error Handling
- Path not found → abort with clear error message
- Permission denied → escalate to user
- Timeout on large codebase → suggest --quick flag
```

### Campos-chave

- **frontmatter:** Identifica a task (id, agent, complexity)
- **Input:** O que a task recebe
- **Output:** O que a task produz
- **Process:** Passos sequenciais (o agente segue literalmente)
- **Checklist:** Pre/post-conditions
- **Error Handling:** O que fazer quando falha

---

## Tutorial 3: Criar Template Custom

### Estrutura do ficheiro

Cria em `.aios-core/development/templates/`:

```yaml
# .aios-core/development/templates/security-report-tmpl.yaml
name: Security Report Template
version: 1.0.0
output_format: markdown
output_filename: security-report.md

sections:
  - name: header
    content: |
      # Security Report
      **Date:** {date}
      **Target:** {target_path}
      **Scan Type:** {scan_type}
      **Risk Score:** {risk_score}/100

  - name: summary
    content: |
      ## Summary
      | Severity | Count |
      |----------|-------|
      | CRITICAL | {critical_count} |
      | HIGH | {high_count} |
      | MEDIUM | {medium_count} |
      | LOW | {low_count} |

  - name: findings
    content: |
      ## Findings
      {findings_list}

  - name: finding_item
    repeatable: true
    content: |
      ### [{severity}] {title}
      **File:** {file_path}:{line_number}
      **Description:** {description}
      **Remediation:** {remediation}

  - name: recommendations
    content: |
      ## Recommendations
      {recommendations_list}
```

---

## Tutorial 4: Criar Checklist Custom

### Estrutura do ficheiro

Cria em `.aios-core/development/checklists/`:

```markdown
<!-- .aios-core/development/checklists/security-checklist.md -->
# Security Checklist

## Pre-conditions
- [ ] Código-fonte acessível
- [ ] Dependências instaladas (`node_modules/` existe)
- [ ] Nenhum scan em progresso

## OWASP Top 10 Checks
- [ ] A01: Broken Access Control — verificar auth em todas as rotas
- [ ] A02: Cryptographic Failures — verificar uso de crypto
- [ ] A03: Injection — verificar inputs não sanitizados
- [ ] A04: Insecure Design — verificar padrões de design
- [ ] A05: Security Misconfiguration — verificar configs expostas
- [ ] A06: Vulnerable Components — verificar dependencies
- [ ] A07: Auth Failures — verificar mecanismos de auth
- [ ] A08: Data Integrity — verificar serialização
- [ ] A09: Logging Failures — verificar logs de segurança
- [ ] A10: SSRF — verificar requests server-side

## Post-conditions
- [ ] Todos os checks executados
- [ ] Findings documentados com severity
- [ ] Remediações propostas para CRITICAL e HIGH
- [ ] Report gerado e salvo
```

---

## Exemplo End-to-End

Vamos criar um agente **completo** com task + template + checklist que funcionam juntos:

```
1. @security-auditor          ← Agente (persona + comandos)
   │
   ├── *scan packages/auth/   ← Comando activa a task
   │   │
   │   ├── security-scan.md   ← Task (process + steps)
   │   │   │
   │   │   ├── security-report-tmpl.yaml  ← Template (formato output)
   │   │   │
   │   │   └── security-checklist.md      ← Checklist (validação)
   │   │
   │   └── Output: security-report.md     ← Artefacto gerado
   │
   └── *exit                   ← Sair do agente
```

**Fluxo:**
1. Activas `@security-auditor`
2. Corres `*scan packages/auth/`
3. O agente carrega `security-scan.md` (task)
4. Segue os passos do Process
5. Usa `security-report-tmpl.yaml` para formatar o output
6. Valida com `security-checklist.md`
7. Produz `security-report.md`

---

## Rules System

Rules em `.claude/rules/` são carregadas automaticamente pelo Claude Code.

### Criar rule custom

```markdown
<!-- .claude/rules/security-rules.md -->
---
paths:
  - "packages/auth/**"
  - "packages/api/**"
---

# Security Rules

Ao trabalhar em ficheiros de auth ou API:
- Verificar sempre que inputs são sanitizados
- Nunca usar eval() ou dynamic code execution
- Sempre usar parameterized queries para DB
- Logar tentativas de auth falhadas
```

### Como funciona

- **Sem `paths:`** → Carregada sempre (global rule)
- **Com `paths:`** → Carregada apenas quando trabalhas em ficheiros que fazem match

### Rules existentes do AIOS

| Rule | Escopo |
|------|--------|
| `agent-authority.md` | Global — define permissões |
| `agent-handoff.md` | Na troca de agentes |
| `workflow-execution.md` | Na execução de workflows |
| `mcp-usage.md` | Ao usar ferramentas MCP |
| `tool-examples.md` | Na selecção de ferramentas |

Podes adicionar as tuas rules **sem tocar nas existentes** — coexistem no mesmo directório.

---

## Exercício

**Criar um agente custom com 2 comandos, 1 task e 1 template funcionais.**

1. Escolhe um domínio (ex: performance testing, API documentation, code metrics)
2. Cria o ficheiro de agente em `.aios-core/development/agents/`
3. Cria 1 task em `.aios-core/development/tasks/`
4. Cria 1 template em `.aios-core/development/templates/`
5. Cria 1 checklist em `.aios-core/development/checklists/`
6. Activa o agente e executa o comando principal
7. Verifica: o output segue o template? O checklist passa?
