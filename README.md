# Gerenciador de Poker (React + Vite + TypeScript)

Aplicação mobile-first para controle de jogadores de poker, com persistência automática em LocalStorage e resumo de valores.

## Requisitos

- Node 18+ recomendado.

## Instalação

```bash
npm install
```

## Ambiente de desenvolvimento

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Pré-visualização do build

```bash
npm run preview
```

## Funcionalidades

- Cadastro rápido de jogadores com nome, rateio, valor de entrada, recompras e add-on.
- Configurações de evento para valores de recompra e add-on.
- Lista com edição inline, contador de recompras, toggle de add-on e remoção.
- Resumo fixo com totais e contagem por tipo de rateio.
- Persistência automática no LocalStorage (dados mock se não houver histórico).

## Estrutura

- `src/components`: componentes reutilizáveis (cards, formulários, navegação, resumo).
- `src/store`: hooks utilitários (persistência).
- `src/types.ts`: tipos compartilhados para jogadores e configuração.
