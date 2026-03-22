# InitoBot Landing Page

Landing page oficial do InitoBot com arquitetura em transicao para Angular.

## Visao geral

Este repositorio contem dois contextos de front-end:

- `raiz/` (projeto principal): aplicacao Angular 21 com Standalone Components
- `Design/` (referencia): implementacao React + Vite usada como base visual e funcional para a migracao

Objetivo atual: recriar toda a landing page do InitoBot em Angular moderno, mantendo identidade visual, animacoes e estrutura de secoes do projeto React.

## Stack principal

### Angular (raiz)

- Angular 21.2
- Standalone Components
- Angular Router
- TypeScript 5.9 em modo strict
- Tailwind CSS 4 + PostCSS
- Vitest + JSDOM para testes unitarios

### Design de referencia (`Design/`)

- React 18 + Vite
- Tailwind CSS 3
- Framer Motion
- TanStack React Query
- Radix UI
- Integracoes Base44

## Estrutura do repositorio

```text
.
|-- src/
|   |-- app/
|   |   |-- app.ts          # root component Angular
|   |   |-- app.html        # template (ainda padrao do Angular CLI)
|   |   |-- app.routes.ts   # rotas da aplicacao Angular
|   |   |-- app.config.ts   # providers globais
|   |-- main.ts             # bootstrapApplication()
|   |-- styles.css          # estilos globais + Tailwind
|
|-- public/                 # assets copiados no build Angular
|
|-- Design/                 # implementacao React usada como referencia
|   |-- main.jsx
|   |-- pages.config.js
|   |-- src/
|   |   |-- App.jsx
|   |   |-- components/
|   |       |-- landing/    # secoes da landing (Hero, Features, Roadmap...)
|   |       |-- pages/
|   |       |-- ui/
|   |       |-- lib/
|
|-- angular.json
|-- package.json
|-- tailwind.config.js
```

## 📁 Arquitetura do Projeto

Este projeto utiliza Angular Standalone Components e segue uma arquitetura baseada em domínios:

- `src/app/core/`: Serviços globais, interceptors e configurações únicas (Singletons).
- `src/app/shared/`: Componentes visuais genéricos (botões, modais) compartilhados por toda a aplicação.
- `src/app/layout/`: Componentes estruturais (Header, Footer, Navbar).
- `src/app/features/`: Módulos de negócio da aplicação (ex: `landing` page e suas seções).

## Estado atual da migracao

- O app Angular esta inicializado e configurado com Standalone.
- O template raiz Angular (`src/app/app.html`) ainda esta com o conteudo padrao do scaffold.
- A versao React em `Design/` contem a landing completa, com as secoes e interacoes que servem de referencia para o porte.

## Secoes da landing existentes em `Design/`

Principais componentes de referencia:

- `Navbar`
- `HeroSection`
- `BentoGrid`
- `LiveTerminal`
- `FeatureSection`
- `ArchitectureSection`
- `RoadmapSection`
- `Footer`
- componentes de efeito/animacao (`ScrollStoryline`, `ScrollFade`, `RevealText`, etc.)

## Requisitos

- Node.js 20+
- npm 10+

## Como executar

### 1) Instalar dependencias (Angular)

Na raiz do repositorio:

```bash
npm install
```

### 2) Rodar Angular (projeto principal)

```bash
npm start
```

Aplicacao em: `http://localhost:4200`

### 3) Rodar a referencia React (opcional)

Em outro terminal:

```bash
cd Design
npm install
npm run dev
```

Aplicacao em: `http://localhost:5173`

## Scripts uteis

### Raiz (Angular)

- `npm start` - inicia servidor de desenvolvimento Angular
- `npm run build` - gera build de producao
- `npm run watch` - build em modo watch (development)
- `npm test` - executa testes unitarios (Vitest)

### `Design/` (React)

- `npm run dev` - servidor Vite
- `npm run build` - build Vite
- `npm run preview` - preview do build
- `npm run lint` - lint
- `npm run lint:fix` - lint com correcao automatica
- `npm run typecheck` - validacao de tipos/config JS

## Arquitetura Angular (direcao recomendada)

Durante a migracao, a organizacao sugerida para escalar o projeto:

- `src/app/core/` para servicos singleton, interceptors e infra
- `src/app/shared/` para componentes reutilizaveis e utilitarios de UI
- `src/app/features/landing/` para secoes especificas da landing
- `src/app/pages/` para composicao de telas/rotas

## Build e qualidade

- Compilacao TypeScript em modo strict
- `strictTemplates` habilitado no Angular Compiler
- Testes unitarios via Vitest
- Tailwind configurado na raiz para arquivos Angular (`src/**/*.{html,ts}`)

## Roadmap resumido

1. Definir rotas iniciais em `app.routes.ts`
2. Criar pagina Home Angular standalone
3. Migrar secoes da landing React para Angular componente por componente
4. Consolidar sistema de estilos/tokens na implementacao Angular
5. Remover dependencias de referencia quando a migracao estiver concluida

## Comandos Angular CLI uteis

```bash
# gerar componente standalone
ng generate component features/landing/hero --standalone

# gerar service
ng generate service core/services/navigation

# listar opcoes de schematics
ng generate --help
```

## Observacoes importantes

- A pasta `Design/` funciona como referencia de UX/UI e nao como produto final alvo.
- O foco do repositorio e a versao Angular na raiz.
- Caso deseje comparar comportamento visual, rode os dois projetos localmente em paralelo.

## Licenca

Definir licenca do projeto (ex.: MIT) em um arquivo `LICENSE` na raiz.
