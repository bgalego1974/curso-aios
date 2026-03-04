# AIOS Sandbox — Task Manager

Projecto-exemplo para praticar o Synkra AIOS. Usa este sandbox para seguir os exercícios dos Módulos 6 (Greenfield), 7 (Brownfield) e 12 (Projecto Final).

## Quick Start

```bash
# 1. Entrar no sandbox
cd curso-aios/sandbox

# 2. Instalar dependências
npm install

# 3. Instalar AIOS
npx aios-core install

# 4. Verificar que tudo funciona
npx aios-core doctor

# 5. Correr o projecto
npm run dev
```

## Estrutura

```
sandbox/
├── src/                    # Código fonte
│   ├── index.js            # Entry point
│   ├── tasks.js            # CRUD de tarefas
│   └── utils.js            # Utilitários
├── tests/                  # Testes
│   └── tasks.test.js       # Testes do módulo de tarefas
├── docs/                   # Documentação (gerada pelo AIOS)
├── package.json            # Config do projecto
└── README.md               # Este ficheiro
```

## Como Usar com o Curso

### Módulo 6 — Greenfield

Segue a sequência completa:
1. `@devops *environment-bootstrap` — setup git
2. `@pm *create-epic` — criar epic para o Task Manager
3. `@sm *draft` — criar stories
4. `@po *validate-story-draft` — validar
5. `@dev *develop` — implementar
6. `@qa *qa-gate` — quality check
7. `@devops *push` — entregar

### Módulo 7 — Brownfield

O sandbox já tem código. Trata-o como projecto existente:
1. `npx aios-core install` — instalar AIOS
2. Correr Brownfield Discovery (10 fases)
3. Gerar tech debt report
4. Criar stories a partir do discovery

### Módulo 12 — Projecto Final

Usa este sandbox como base para a Opção A (Greenfield) — expande o Task Manager com features novas (categorias, prioridades, filtros, export CSV, etc.).

## Comandos

```bash
npm run dev          # Correr projecto
npm test             # Correr testes
npm run lint         # Verificar estilo
npm run typecheck    # Verificar tipos
```

## Funcionalidades Existentes

- Criar tarefa (título, descrição)
- Listar tarefas
- Marcar tarefa como concluída
- Remover tarefa

## Funcionalidades Sugeridas para Expandir

- Categorias / tags
- Prioridades (low, medium, high, critical)
- Filtros (por estado, categoria, prioridade)
- Export CSV
- Datas de vencimento
- Pesquisa full-text
