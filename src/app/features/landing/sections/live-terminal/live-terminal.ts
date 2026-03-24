import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type MessageRole = 'user' | 'inito' | 'system';

interface TerminalMessage {
  role: MessageRole;
  text: string;
  isCode?: boolean;
  code?: string;
  isWarning?: boolean;
}

interface TerminalStat {
  label: string;
  value: string;
}

@Component({
  selector: 'app-live-terminal',
  imports: [],
  templateUrl: './live-terminal.html',
  styleUrl: './live-terminal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveTerminal implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private observer: IntersectionObserver | null = null;
  private typingInterval: ReturnType<typeof setInterval> | null = null;
  private revealTimer: ReturnType<typeof setTimeout> | null = null;
  private hasStarted = false;

  readonly conversations: TerminalMessage[] = [
    { role: 'user', text: '!perguntar O que é uma função em Python?' },
    {
      role: 'inito',
      text: 'Boa pergunta! Uma função em Python é um bloco de código reutilizável que executa uma tarefa específica. Pensa assim: você define uma vez e usa quantas vezes quiser! 🐍',
    },
    {
      role: 'inito',
      text: 'Exemplo prático:',
      isCode: true,
      code: 'def saudacao(nome):\n    return f"Olá, {nome}! Bem-vindo!"\n\nprint(saudacao("Dev"))  # Olá, Dev!',
    },
    {
      role: 'user',
      text: '!perguntar Posso criar uma função que soma dois números?',
    },
    {
      role: 'inito',
      text: 'Claro! Veja como é simples 👇',
      isCode: true,
      code: 'def somar(a, b):\n    return a + b\n\nresultado = somar(5, 3)\nprint(resultado)  # 8',
    },
    {
      role: 'system',
      text: '⚠ warn @usuario spam detectado — Motivo: flood de mensagens',
      isWarning: true,
    },
    {
      role: 'inito',
      text: 'Aviso registrado. Este é o 1º de 3 avisos. Trate os outros com respeito! 🤝',
    },
    { role: 'user', text: '!perguntar Me explica loops!' },
    {
      role: 'inito',
      text: 'Loops repetem ações automaticamente. O for em Python é assim:',
      isCode: true,
      code: 'for i in range(5):\n    print(f"Iteração {i}")',
    },
  ];

  readonly stats: TerminalStat[] = [
    { label: 'Tempo médio de resposta', value: '< 1s' },
    { label: 'Precisão nas respostas', value: '97%' },
    { label: 'Dúvidas respondidas', value: '12k+' },
  ];

  readonly visibleCount = signal(0);
  readonly animatingIdx = signal(-1);
  readonly typingText = signal('');
  readonly inView = signal(false);

  ngAfterViewInit(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const section = this.host.nativeElement.querySelector(
      '[data-live-section]',
    ) as HTMLElement | null;

    if (!section) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          this.inView.set(true);

          if (!this.hasStarted) {
            this.hasStarted = true;
            this.startSequence();
          }

          this.observer?.disconnect();
          break;
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px',
      },
    );

    this.observer.observe(section);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    this.observer?.disconnect();
    this.observer = null;
    this.clearTimers();
  }

  visibleMessages(): TerminalMessage[] {
    return this.conversations.slice(0, this.visibleCount());
  }

  isSystem(msg: TerminalMessage): boolean {
    return msg.role === 'system';
  }

  isUser(msg: TerminalMessage): boolean {
    return msg.role === 'user';
  }

  rowClass(msg: TerminalMessage): string {
    return `live-message-enter flex gap-3 ${this.isUser(msg) ? 'flex-row-reverse' : ''} items-start`;
  }

  avatarClass(msg: TerminalMessage): string {
    return `flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
      this.isUser(msg)
        ? 'bg-gray-700 text-gray-300'
        : 'bg-orange-500/20 border border-orange-500/30'
    }`;
  }

  bubbleWrapClass(msg: TerminalMessage): string {
    return `max-w-[85%] ${this.isUser(msg) ? 'text-right' : ''}`;
  }

  labelClass(msg: TerminalMessage): string {
    return `text-[10px] font-semibold tracking-wider uppercase ${this.isUser(msg) ? 'text-gray-600' : 'text-orange-500'}`;
  }

  bubbleClass(msg: TerminalMessage): string {
    return `mt-1 px-3 py-2 rounded-xl text-xs leading-relaxed ${
      this.isUser(msg)
        ? 'bg-gray-800/80 text-gray-300 rounded-tr-none'
        : 'bg-[#1a1008] border border-orange-500/15 text-gray-300 rounded-tl-none'
    }`;
  }

  displayText(msg: TerminalMessage, index: number): string {
    if (this.animatingIdx() === index && !this.isSystem(msg)) {
      return this.typingText();
    }

    return msg.text;
  }

  showCursor(msg: TerminalMessage, index: number): boolean {
    return this.animatingIdx() === index && !this.isSystem(msg);
  }

  codeLines(msg: TerminalMessage): string[] {
    return msg.code ? msg.code.split('\n') : [];
  }

  codeLineClass(line: string): string {
    if (
      line.includes('def ') ||
      line.includes('return') ||
      line.includes('for ') ||
      line.includes('print')
    ) {
      return 'text-purple-400';
    }

    if (line.includes('#')) {
      return 'text-gray-600 italic';
    }

    if (line.includes('"') || line.includes("'")) {
      return 'text-green-400';
    }

    return 'text-gray-300';
  }

  private startSequence(): void {
    this.clearTimers();
    this.visibleCount.set(1);
    this.animatingIdx.set(0);
    this.startTypingFor(0);
  }

  private startTypingFor(index: number): void {
    const msg = this.conversations[index];

    if (!msg) {
      return;
    }

    if (this.isSystem(msg)) {
      this.typingText.set(msg.text);
      this.scheduleNext(200);
      return;
    }

    const text = msg.text;
    let charIndex = 0;
    this.typingText.set('');

    this.typingInterval = setInterval(() => {
      charIndex += 1;
      this.typingText.set(text.slice(0, charIndex));

      if (charIndex >= text.length) {
        this.clearTypingInterval();
        this.scheduleNext(msg.isCode ? 220 : 0);
      }
    }, 12);
  }

  private scheduleNext(extraDelay = 0): void {
    const next = this.visibleCount();

    if (next >= this.conversations.length) {
      this.animatingIdx.set(-1);
      return;
    }

    const baseDelay = next % 2 === 0 ? 400 : 700;

    this.revealTimer = setTimeout(() => {
      this.visibleCount.set(next + 1);
      this.animatingIdx.set(next);
      this.startTypingFor(next);
    }, baseDelay + extraDelay);
  }

  private clearTypingInterval(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  private clearTimers(): void {
    this.clearTypingInterval();

    if (this.revealTimer) {
      clearTimeout(this.revealTimer);
      this.revealTimer = null;
    }
  }
}
