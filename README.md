# InitoBot Landing Page

Landing page oficial do InitoBot, implementada em Angular 21 com Standalone Components.

## Visao Geral

Este repositorio contem a aplicação web da landing page, com foco em:

1. Performance de carregamento.
2. Componentização por domínio.
3. Testes unitarios para seções críticas.
4. Pipeline CI com validação de build e testes.

## Stack

- Angular 21.2
- TypeScript 5.9 (strict)
- Angular Router
- Tailwind CSS 4 + PostCSS
- Vitest + JSDOM

## Requisitos

- Node.js 20+
- npm 10+

## Setup do Projeto

1. Instale dependencias:

```bash
npm install
```

2. Execute o ambiente local:

```bash
npm start
```

3. Acesse:

```text
http://localhost:4200
```

## Scripts

| Script                                   | Descricao                                  |
| ---------------------------------------- | ------------------------------------------ |
| `npm start`                              | Inicia servidor de desenvolvimento Angular |
| `npm run build`                          | Gera build de producao                     |
| `npm run watch`                          | Build em modo watch (`development`)        |
| `npm test`                               | Executa testes unitários                   |
| `npm run serve:ssr:web-initobot-landing` | Sobe a versao SSR após build               |

## Estrutura de Pastas

```text
src/
	app/
		core/       # serviços singleton, infra e configurações globais
		shared/     # componentes reutilizáveis, utilitários e diretivas comuns
		features/   # módulos por domínio (ex: landing)
		layout/     # componentes estruturais (header/footer/shell)
		pages/      # composição de páginas e rotas de alto nível
```

## Fluxo de Contribuição

1. Crie uma branch a partir da `main`:

```bash
git checkout -b feature/nome-da-issue
```

2. Desenvolva com commits pequenos e objetivos.

3. Antes de abrir PR, execute:

```bash
npm run build
npm test -- --watch=false
```

4. Abra Pull Request com:

- contexto do problema
- solução aplicada
- evidências de teste (saida dos comandos)
- checklist de impacto (UI, acessibilidade, testes)

5. Aguarde validação de CI e review.

## CI e Qualidade

O workflow em `.github/workflows/ci.yml` valida:

1. Instalação de dependencias.
2. Build da aplicação.
3. Execução de testes unitários.

Falhas em build ou testes devem bloquear merge quando a branch `main` estiver com regras de proteção e checks obrigatórios habilitados no GitHub.

## Comandos Angular CLI Uteis

```bash
# gerar componente standalone
ng generate component features/landing/nome-da-secao --standalone

# gerar service
ng generate service core/services/nome-do-service

# ajuda geral
ng generate --help
```
