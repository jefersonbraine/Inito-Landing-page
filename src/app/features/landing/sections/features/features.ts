import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';

type FeatureId = 'moderation' | 'mentor' | 'onboarding';

type IconKey =
  | 'shield'
  | 'brain'
  | 'rocket'
  | 'alert-triangle'
  | 'clock'
  | 'file-text'
  | 'message-square'
  | 'lightbulb'
  | 'code'
  | 'user-plus'
  | 'settings'
  | 'bell';

interface FeatureHighlight {
  icon: IconKey;
  text: string;
}

interface FeatureBlock {
  id: FeatureId;
  label: string;
  icon: IconKey;
  title: string;
  description: string;
  highlights: FeatureHighlight[];
  codeLines: FeatureCodeLine[];
}

interface FeatureCodeLine {
  tokens: FeatureCodeToken[];
}

interface FeatureCodeToken {
  text: string;
  className: string;
}

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Features implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;
  private readonly pythonKeywords = new Set([
    'import',
    'from',
    'class',
    'def',
    'async',
    'await',
    'return',
    'if',
    'else',
    'for',
    'in',
    'with',
    'as',
    'try',
    'except',
    'True',
    'False',
    'None',
  ]);

  readonly iconPaths: Record<IconKey, string> = {
    shield:
      'M12 2 4 5v6c0 4.9 3.4 9.5 8 10.9 4.6-1.4 8-6 8-10.9V5l-8-3Zm-1 15-4-4 1.4-1.4L11 14.2l4.6-4.6L17 11l-6 6Z',
    brain:
      'M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 3 3h1v-4H8v-2h2V8H8V6h2V3H9Zm6 0h-1v4h2v2h-2v3h2v2h-2v4h1a3 3 0 0 0 3-3v-1a3 3 0 0 0 0-6V6a3 3 0 0 0-3-3Z',
    rocket: 'M13 2c3.5.4 6.5 3.4 7 7l-4 4-3-3-3-3 3-3Zm-4 5L5 11l-3 9 9-3 4-4m-5 5 4-4',
    'alert-triangle': 'M12 3 2 21h20L12 3Zm0 6v5m0 4h.01',
    clock: 'M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 5h-2v6l5 3 1-1.7-4-2.3V7Z',
    'file-text': 'M6 2h8l4 4v16H6V2Zm7 1v4h4M8 11h8M8 15h8M8 19h5',
    'message-square': 'M3 4h18v12H8l-5 5V4Zm4 4h10M7 11h7',
    lightbulb: 'M12 2a7 7 0 0 0-4 12v2h8v-2a7 7 0 0 0-4-12Zm-3 16h6v2H9v-2Z',
    code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-4-12-2 14',
    'user-plus':
      'M15 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-7 8h6a5 5 0 0 1 5 5H3a5 5 0 0 1 5-5Zm12-5v6m-3-3h6',
    settings:
      'm12 1 2.2 1 .6 2.4 2.2.9 2-1.2 1.6 1.6-1.2 2 .9 2.2 2.4.6 1 2.2-1 2.2-2.4.6-.9 2.2 1.2 2-1.6 1.6-2-1.2-2.2.9-.6 2.4L12 23l-2.2-1-.6-2.4-2.2-.9-2 1.2-1.6-1.6 1.2-2-.9-2.2-2.4-.6L1 12l1-2.2 2.4-.6.9-2.2-1.2-2L5.7 3.4l2 1.2 2.2-.9.6-2.4L12 1Zm0 7a4 4 0 1 0 .001 8.001A4 4 0 0 0 12 8Z',
    bell: 'M12 2a5 5 0 0 0-5 5v3.6L5 14v1h14v-1l-2-3.4V7a5 5 0 0 0-5-5Zm-2 16a2 2 0 1 0 4 0h-4Z',
  };

  readonly features = signal<FeatureBlock[]>([
    {
      id: 'moderation',
      label: '01',
      icon: 'shield',
      title: 'Moderação Segura',
      description:
        'Sistema completo de moderação com warnings progressivos, kick, ban e logs detalhados. Mantenha sua comunidade protegida sem complicações.',
      highlights: [
        { icon: 'alert-triangle', text: 'Sistema de Warnings Progressivos' },
        { icon: 'clock', text: 'Histórico Completo de Ações' },
        { icon: 'file-text', text: 'Logs Detalhados e Auditoria' },
      ],
      codeLines: this.buildCodeLines(
        `import disnake\nfrom disnake.ext import commands\n\nclass Moderation(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    @commands.slash_command()\n    @commands.has_permissions(kick_members=True)\n    async def warn(self, inter, member: disnake.Member, reason: str):\n        """Aplica um aviso ao membro"""\n        await self.bot.db.add_warning(member.id, reason)\n        warnings = await self.bot.db.get_warnings(member.id)`,
        ['has_permissions', 'add_warning', 'get_warnings'],
      ),
    },
    {
      id: 'mentor',
      label: '02',
      icon: 'brain',
      title: 'Mentor com IA',
      description:
        'Respostas didáticas e personalizadas sobre programação. O Inito não apenas responde - ele ensina de forma que iniciantes possam entender.',
      highlights: [
        { icon: 'message-square', text: 'Respostas Contextualizadas' },
        { icon: 'lightbulb', text: 'Explicações Didáticas' },
        { icon: 'code', text: 'Exemplos de Código Práticos' },
      ],
      codeLines: this.buildCodeLines(
        `import disnake\nfrom disnake.ext import commands\nfrom openai import AsyncOpenAI\n\nclass MentorIA(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n        self.ai = AsyncOpenAI()\n\n    @commands.slash_command()\n    async def perguntar(self, inter, duvida: str):\n        """Faça uma pergunta sobre programação"""\n        await inter.response.defer()`,
        ['AsyncOpenAI', 'slash_command', 'perguntar'],
      ),
    },
    {
      id: 'onboarding',
      label: '03',
      icon: 'rocket',
      title: 'Onboarding Automático',
      description:
        'Receba novos membros com uma experiência personalizada. Atribuição automática de cargos, boas-vindas e orientações iniciais.',
      highlights: [
        { icon: 'user-plus', text: 'Boas-vindas Personalizadas' },
        { icon: 'settings', text: 'Atribuição Automática de Cargos' },
        { icon: 'bell', text: 'Notificações Configuráveis' },
      ],
      codeLines: this.buildCodeLines(
        `import disnake\nfrom disnake.ext import commands\n\nclass Onboarding(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    @commands.Cog.listener()\n    async def on_member_join(self, member: disnake.Member):\n        """Processa entrada de novos membros"""\n        role = member.guild.get_role(INICIANTE_ROLE_ID)\n        await member.add_roles(role)`,
        ['listener', 'on_member_join', 'add_roles'],
      ),
    },
  ]);

  private buildCodeLines(raw: string, focusTerms: string[]): FeatureCodeLine[] {
    return raw.split('\n').map((text) => ({
      tokens: this.tokenizePythonLine(text, focusTerms),
    }));
  }

  private tokenizePythonLine(text: string, focusTerms: string[]): FeatureCodeToken[] {
    if (!text) {
      return [{ text: '', className: 'tok-text' }];
    }

    const tokens: FeatureCodeToken[] = [];
    const regex =
      /(#[^\n]*|""".*?"""|"[^"]*"|'[^']*'|@[A-Za-z_][\w.]*\([^)]*\)|@[A-Za-z_][\w.]*|\b[A-Za-z_][\w]*(?=\()|\b\d+\b|[()\[\]{},.:=])/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null = regex.exec(text);

    while (match) {
      const start = match.index;
      const value = match[0];

      if (start > lastIndex) {
        tokens.push({
          text: text.slice(lastIndex, start),
          className: 'tok-text',
        });
      }

      tokens.push({
        text: value,
        className: this.getTokenClass(value, focusTerms),
      });

      lastIndex = start + value.length;
      match = regex.exec(text);
    }

    if (lastIndex < text.length) {
      tokens.push({
        text: text.slice(lastIndex),
        className: 'tok-text',
      });
    }

    return tokens;
  }

  private getTokenClass(token: string, focusTerms: string[]): string {
    if (token.startsWith('#')) {
      return 'tok-comment';
    }

    if (token.startsWith('"') || token.startsWith("'")) {
      return 'tok-string';
    }

    if (token.startsWith('@')) {
      return 'tok-decorator';
    }

    if (this.pythonKeywords.has(token)) {
      return 'tok-keyword';
    }

    if (token === 'self') {
      return 'tok-self';
    }

    if (/^\d+$/.test(token)) {
      return 'tok-number';
    }

    if (/^[()\[\]{},.:=]$/.test(token)) {
      return 'tok-punc';
    }

    if (focusTerms.some((term) => token.includes(term))) {
      return 'tok-focus';
    }

    if (/^[A-Za-z_][\w]*$/.test(token)) {
      return 'tok-symbol';
    }

    return 'tok-text';
  }

  ngAfterViewInit(): void {
    const animated = this.host.nativeElement.querySelectorAll('[data-reveal]');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    animated.forEach((element: Element) => this.observer?.observe(element));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
