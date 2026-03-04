---
title: "Módulo 5: Os 4 Workflows"
description: Dominar os workflows que governam todo o trabalho no AIOS.
sidebar:
  order: 2
---

O AIOS tem 4 workflows que cobrem todas as situações de desenvolvimento. Saber qual usar em cada cenário é a diferença entre um processo fluido e um caos organizado.

---

## Workflow 1: Story Development Cycle (SDC)

O workflow **principal** — usado para todo o desenvolvimento. 4 fases obrigatórias.

```mermaid
graph LR
    P1["Phase 1: CREATE<br/>@sm River<br/>create-next-story.md"]
    P2["Phase 2: VALIDATE<br/>@po Pax<br/>validate-next-story.md"]
    P3["Phase 3: IMPLEMENT<br/>@dev Dex<br/>dev-develop-story.md"]
    P4["Phase 4: QA GATE<br/>@qa Quinn<br/>qa-gate.md"]

    P1 --> P2
    P2 -->|"GO (≥7/10)"| P3
    P2 -->|"NO-GO (<7)"| P1
    P3 --> P4
    P4 -->|PASS| DONE["✅ Done"]
    P4 -->|FAIL| P3

    style P1 fill:#4c6ef5,color:#fff
    style P2 fill:#7950f2,color:#fff
    style P3 fill:#ae3ec9,color:#fff
    style P4 fill:#e64980,color:#fff
    style DONE fill:#51cf66,color:#fff
```

### Fases em detalhe

| Fase | Agente | Task | Output | Decisão |
|------|--------|------|--------|---------|
| 1. Create | @sm | `create-next-story.md` | `X.Y.story.md` (Draft) | — |
| 2. Validate | @po | `validate-next-story.md` | Checklist 10 pontos | GO (≥7) / NO-GO |
| 3. Implement | @dev | `dev-develop-story.md` | Código + testes | — |
| 4. QA Gate | @qa | `qa-gate.md` | 7 quality checks | PASS / FAIL / CONCERNS / WAIVED |

### Transições de Status da Story

```
Draft → Ready (PO valida GO) → InProgress (Dev começa) → InReview (QA) → Done (QA PASS)
```

---

## Workflow 2: QA Loop

Ciclo **iterativo** de review/fix após o QA Gate inicial. Automático, com limite de 5 iterações.

```mermaid
graph TD
    START["@qa review"] --> VERDICT{Verdict?}
    VERDICT -->|APPROVE| DONE["✅ Done"]
    VERDICT -->|REJECT| FIX["@dev corrige"]
    VERDICT -->|BLOCKED| ESCALATE["⚠️ Escalação<br/>@aios-master"]
    FIX --> REVIEW["@qa re-review"]
    REVIEW --> VERDICT2{Verdict?}
    VERDICT2 -->|APPROVE| DONE
    VERDICT2 -->|REJECT| CHECK{"Iteração < 5?"}
    VERDICT2 -->|BLOCKED| ESCALATE
    CHECK -->|Sim| FIX
    CHECK -->|"Não (max reached)"| ESCALATE

    style DONE fill:#51cf66,color:#fff
    style ESCALATE fill:#ff6b6b,color:#fff
```

### Comandos

| Comando | Acção |
|---------|-------|
| `*qa-loop {storyId}` | Iniciar loop |
| `*qa-loop-review` | Resumir da review |
| `*qa-loop-fix` | Resumir do fix |
| `*stop-qa-loop` | Pausar, guardar estado |
| `*resume-qa-loop` | Resumir do estado |
| `*escalate-qa-loop` | Forçar escalação |

### Verdicts

| Verdict | O que acontece |
|---------|----------------|
| **APPROVE** | Story marcada Done ✅ |
| **REJECT** | @dev corrige, @qa re-review |
| **BLOCKED** | Escalação imediata a @aios-master |

### Triggers de Escalação

- `max_iterations_reached` — 5 iterações sem APPROVE
- `verdict_blocked` — QA detecta blocker
- `fix_failure` — @dev não consegue corrigir
- `manual_escalate` — escalação forçada

---

## Workflow 3: Spec Pipeline

Transforma requisitos informais em **spec executável**. A complexidade determina quantas fases.

```mermaid
graph LR
    G["1. Gather<br/>@pm"]
    A["2. Assess<br/>@architect"]
    R["3. Research<br/>@analyst"]
    W["4. Write Spec<br/>@pm"]
    C["5. Critique<br/>@qa"]
    P["6. Plan<br/>@architect"]

    G --> A
    A --> R
    R --> W
    W --> C
    C -->|"APPROVED (≥4.0)"| P
    C -->|"NEEDS_REVISION (3.0-3.9)"| W
    C -->|"BLOCKED (<3.0)"| ESC["⚠️ Escalação"]

    style G fill:#4c6ef5,color:#fff
    style A fill:#7950f2,color:#fff
    style R fill:#ae3ec9,color:#fff
    style W fill:#4c6ef5,color:#fff
    style C fill:#e64980,color:#fff
    style P fill:#7950f2,color:#fff
```

### Classes de Complexidade

A complexidade é calculada por 5 dimensões (scored 1-5): Scope, Integration, Infrastructure, Knowledge, Risk.

| Score Total | Classe | Fases Executadas |
|-------------|--------|------------------|
| ≤ 8 | **SIMPLE** | gather → spec → critique (3 fases) |
| 9-15 | **STANDARD** | Todas as 6 fases |
| ≥ 16 | **COMPLEX** | 6 fases + ciclo de revisão |

### Critique Verdicts

| Verdict | Score Médio | Próximo Passo |
|---------|------------|---------------|
| APPROVED | ≥ 4.0 | Avança para Plan (Fase 6) |
| NEEDS_REVISION | 3.0-3.9 | Volta para Write Spec (Fase 4) |
| BLOCKED | < 3.0 | Escalação a @architect |

### Gate Constitutional (Art. IV — No Invention)

Cada afirmação no spec **deve** rastrear a um requisito formal:
- `FR-*` (Functional Requirement)
- `NFR-*` (Non-Functional Requirement)
- `CON-*` (Constraint)
- Research finding

Se algo no spec não tem rastreio → **violação do Art. IV** → bloqueado.

---

## Workflow 4: Brownfield Discovery

Assessment completo de **tech debt** para projectos existentes. 10 fases em 3 grupos.

```mermaid
graph TD
    subgraph COLLECT["📊 Data Collection (Phases 1-3)"]
        P1["Phase 1: @architect<br/>system-architecture.md"]
        P2["Phase 2: @data-engineer<br/>SCHEMA.md + DB-AUDIT.md"]
        P3["Phase 3: @ux<br/>frontend-spec.md"]
    end

    subgraph VALIDATE["🔍 Draft & Validation (Phases 4-7)"]
        P4["Phase 4: @architect<br/>tech-debt-DRAFT.md"]
        P5["Phase 5: @data-engineer<br/>db-specialist-review.md"]
        P6["Phase 6: @ux<br/>ux-specialist-review.md"]
        P7["Phase 7: @qa<br/>QA Gate"]
    end

    subgraph FINAL["🏁 Finalization (Phases 8-10)"]
        P8["Phase 8: @architect<br/>tech-debt FINAL"]
        P9["Phase 9: @analyst<br/>REPORT executivo"]
        P10["Phase 10: @pm<br/>Epic + stories"]
    end

    P1 --> P2 --> P3
    P3 --> P4 --> P5 --> P6 --> P7
    P7 -->|APPROVED| P8
    P7 -->|"NEEDS WORK"| P4
    P8 --> P9 --> P10

    style P7 fill:#e64980,color:#fff
    style P10 fill:#51cf66,color:#fff
```

### QA Gate Intermédio (Phase 7)

| Verdict | O que acontece |
|---------|----------------|
| **APPROVED** | Todos os debits validados, dependencies mapeadas → Phase 8 |
| **NEEDS WORK** | Gaps não resolvidos → volta à Phase 4 para revisão |

---

## Tabela de Decisão

| Cenário | Workflow |
|---------|----------|
| Nova story de um epic | **SDC** (Story Development Cycle) |
| QA encontrou issues, preciso iterar | **QA Loop** |
| Feature complexa precisa de spec | **Spec Pipeline** → depois SDC |
| Entrar num projecto existente | **Brownfield Discovery** |
| Bug fix simples | **SDC** apenas (modo YOLO) |
| Feature simples e bem definida | **SDC** apenas |
| Nova app do zero | Setup → SDC (ver Módulo 6) |
| Refactoring grande num projecto legado | **Brownfield Discovery** → SDC |

---

## Exercício

**Escolhe o workflow correcto para cada cenário:**

1. O PM pediu uma feature de "notificações push". Não há spec.
2. Acabaste de implementar uma story e o QA deu REJECT com 3 issues.
3. A empresa comprou um SaaS concorrente e quer integrar o codebase.
4. Precisas de corrigir um typo no footer da landing page.
5. Queres adicionar autenticação OAuth, que envolve 3 serviços externos.

**Respostas:**
1. Spec Pipeline (complexidade alta, precisa de spec antes de SDC)
2. QA Loop (iteração automática de fix/review)
3. Brownfield Discovery (projecto existente, precisa de assessment)
4. SDC em modo YOLO (simples, bem definido)
5. Spec Pipeline → SDC (múltiplas integrações, precisa de spec)
