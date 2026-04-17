<div align="center">

<br />

![Inito Banner](https://capsule-render.vercel.app/api?type=waving&color=f97316&height=200&section=header&text=INITO&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Inteligência+para+moderar,+empatia+para+ensinar.&descAlignY=60&descSize=18&descColor=ffffff&animation=fadeIn)

<br />



<a href="#">
  <img src="https://img.shields.io/badge/STATUS-EM%20PRODUÇÃO-f97316?style=for-the-badge&labelColor=0a0a0a" />
</a>
<a href="#">
  <img src="https://img.shields.io/badge/VERSÃO-1.0.0-f97316?style=for-the-badge&labelColor=0a0a0a" />
</a>
<a href="#">
  <img src="https://img.shields.io/badge/PYTHON-3.11+-f97316?style=for-the-badge&logo=python&logoColor=white&labelColor=0a0a0a" />
</a>
<a href="#">
  <img src="https://img.shields.io/badge/LICENÇA-MIT-f97316?style=for-the-badge&labelColor=0a0a0a" />
</a>

<br /><br />

<img src="https://img.shields.io/badge/discord.py-5865F2?style=flat-square&logo=discord&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/aiosqlite-003B57?style=flat-square&logo=sqlite&logoColor=white" />
<img src="https://img.shields.io/badge/Groq-FF6B00?style=flat-square&logoColor=white" />

<br /><br />

> *"Cada desenvolvedor iniciante merece um ambiente onde possa errar, aprender e crescer sem medo."*
>
> — **Jeferson**, criador do Inito

<br />

[🌐 Landing Page](#) &nbsp;·&nbsp; [💬 Entrar na Comunidade](#) &nbsp;·&nbsp; [📖 Documentação](#) &nbsp;·&nbsp; [🐛 Reportar Bug](#)

<br />

</div>

---

<br />


<img src="public\assets\PRINT - Site do Inito.png" alt="Print do site do Inito"/>


<div align="center">

## ✦ O que é o Inito?

</div>

O **Inito** é o mascote e mentor digital da comunidade [**Iniciando.dev**](#) — um ambiente criado para desenvolvedores que estão dando os primeiros passos na programação.

Ele combina moderação inteligente, onboarding automático e mentoria com IA em uma arquitetura modular pensada para rodar em produção com confiabilidade real — 24 horas por dia, 7 dias por semana.

<br />

```
                                        ┌─────────────────────────────────────────┐
                                        │                                         │
                                        │       INITO  —  iniciando.dev           │
                                        │                                         │
                                        │   🛡️ Moderação   🚀 Onboarding         │
                                        │   🎓 Mentor IA   ⚙️ Observabilidade    │
                                        │                                         │
                                        │                                         │
                                        └─────────────────────────────────────────┘
```

<br />

---

<br />

<div align="center">

## ✦ Funcionalidades

</div>

<br />

<table>
<tr>
<td width="50%" valign="top">

### 🛡️ Moderação Segura

Sistema completo de governança para manter a comunidade protegida sem complicações.

- ⚠️ Warnings progressivos com histórico persistente
- 🔨 Kick, Ban e Mute com duração configurável
- ⏱️ Unmute automático por timer
- 🧹 Limpeza de mensagens por comando
- 📋 Canal de logs com auditoria completa

</td>
<td width="50%" valign="top">

### 🚀 Onboarding Automático

Cada novo membro recebe uma experiência de entrada personalizada e estruturada.

- 👋 Boas-vindas personalizadas no canal de entrada
- ✅ Painel "Li e Concordo" com verificação de regras
- 🎖️ Atribuição automática de cargos após confirmação
- 🔔 Notificações configuráveis por servidor

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎓 Mentor com IA

O Inito não apenas responde — ele **ensina**. Integrado ao Groq para suporte didático em tempo real.

- 💬 Respostas contextualizadas sobre programação
- 📚 Linguagem acessível para iniciantes
- 💡 Exemplos práticos de código
- 🔁 Formatação automática de código mal indentado *(em breve)*

</td>
<td width="50%" valign="top">

### ⚙️ Produção de Verdade

Arquitetura robusta com observabilidade e confiabilidade desde o início.

- 💾 Banco assíncrono — dados persistem entre reinicializações
- ❤️ Health check via comando e endpoint HTTP
- 🧯 Tratamento centralizado de erros
- 📝 Logs detalhados em todas as operações

</td>
</tr>
</table>

<br />

---

<br />

<div align="center">

## ✦ Stack Tecnológica

</div>

<br />

<div align="center">

| Tecnologia | Versão | Finalidade |
|:---:|:---:|:---|
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | 3.11+ | Linguagem principal |
| ![discord.py](https://img.shields.io/badge/discord.py-5865F2?style=flat-square&logo=discord&logoColor=white) | 2.x | Framework do bot |
| ![aiosqlite](https://img.shields.io/badge/aiosqlite-003B57?style=flat-square&logo=sqlite&logoColor=white) | latest | Banco de dados assíncrono |
| ![Groq](https://img.shields.io/badge/Groq_API-FF6B00?style=flat-square&logoColor=white) | latest | Modelo de IA para o mentor |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | 24+ | Containerização e deploy |

</div>

<br />

---

<br />

<div align="center">

## ✦ Arquitetura

</div>

<br />

O projeto segue o padrão **Cogs** do discord.py — cada funcionalidade é um módulo completamente independente. Isso garante que novas features possam ser adicionadas sem impactar o restante do sistema.

<br />

```
inito/
│
├── 🤖 bot/
│ ├── cogs/
│ │ ├── admin.py → Comandos administrativos gerais
│ │ ├── administration.py → Gestão administrativa complementar
│ │ ├── moderator.py → Moderação (ban, kick, mute, logs)
│ │ ├── security.py → Regras e proteção do servidor
│ │ ├── verification.py → Verificação e controle de acesso
│ │ ├── mentor.py → Mentoria com IA (Groq)
│ │ ├── code_formatter.py → Formatação automática de código
│ │ ├── community.py → Recursos da comunidade/engajamento
│ │ └── errorhandler.py → Tratamento de erros de comandos
│ │
│ ├── core/
│ │ ├── ai_engine.py → Camada de integração com IA
│ │ ├── db_handler.py → Persistência assíncrona (AioSQLite)
│ │ └── logger.py → Logging centralizado
│ │
│ └── health/
│ └── health_server.py → Endpoint HTTP de health check
│
├── 🐳 Dockerfile
├── 🐳 docker-compose.yml
├── 📋 requirements.txt
├── 📘 README.md
└── 🚀 main.py
```

<br />

---

<br />

<div align="center">

## ✦ Roadmap

</div>

<br />

```
✅  Sistema de moderação completo
✅  Onboarding automático com verificação
✅  Mentor com IA integrada (Groq)
✅  Observabilidade e health check
✅  Arquitetura modular com Cogs
✅  Code Formatter automático         
🔄  Dashboard web para moderadores  ← em desenvolvimento
⬜  Moderador Autônomo com IA
```

<br />

> 💡 **Moderador Autônomo** — Um sistema de IA que analisa mensagens em tempo real e sugere ações moderativas. Os moderadores humanos apenas aprovam ou rejeitam. Análise contextual com alta precisão nos testes iniciais.

<br />

---

<br />

<div align="center">

## ✦ Sobre o Projeto

</div>

<br />

O Inito nasceu de uma necessidade real: transformar servidores Discord em **ambientes seguros e acolhedores** para quem está começando na programação.

A [**Iniciando.dev**](#) é uma comunidade dedicada a quem está nos primeiros passos do desenvolvimento. O Inito é o coração técnico dessa comunidade — e foi construído com a mesma filosofia que ela prega: **aprenda fazendo, com suporte de verdade**.

O repositório com o código-fonte é privado, mas toda a documentação, arquitetura e decisões técnicas estão disponíveis aqui para quem quiser aprender com o processo.

<br />

---

<br />

<div align="center">

## ✦ Autor

<br />

**Jeferson**
Criador da Iniciando.dev

<br />

<a href="#">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0a0a0a" />
</a>
&nbsp;
<a href="#">
  <img src="https://img.shields.io/badge/GitHub-ffffff?style=for-the-badge&logo=github&logoColor=black&labelColor=0a0a0a" />
</a>
&nbsp;
<a href="#">
  <img src="https://img.shields.io/badge/Iniciando.dev-f97316?style=for-the-badge&labelColor=0a0a0a" />
</a>

<br /><br />

<br /><br />

![Footer](https://capsule-render.vercel.app/api?type=waving&color=f97316&height=120&section=footer&text=iniciando.dev&fontSize=24&fontColor=ffffff&fontAlignY=65&animation=fadeIn)

</div>
