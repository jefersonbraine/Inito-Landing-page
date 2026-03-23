import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';

type TechKey = 'python' | 'discord.py' | 'SQLite' | 'docker' | 'cogs' | 'async';

interface TechItem {
  key: TechKey;
  name: string;
  description: string;
  accent: string;
  bg: string;
  border: string;
}

@Component({
  selector: 'app-architecture',
  imports: [],
  templateUrl: './architecture.html',
  styleUrl: './architecture.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Architecture implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private observer: IntersectionObserver | null = null;

  readonly techStack: TechItem[] = [
    {
      key: 'python',
      name: 'Python',
      description: 'Linguagem principal',
      accent: 'text-blue-400',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/15',
    },
    {
      key: 'discord.py',
      name: 'Discord.py',
      description: 'Framework Discord',
      accent: 'text-indigo-400',
      bg: 'bg-indigo-500/5',
      border: 'border-indigo-500/15',
    },
    {
      key: 'SQLite',
      name: 'SQLite',
      description: 'Banco de dados',
      accent: 'text-cyan-400',
      bg: 'bg-cyan-500/5',
      border: 'border-cyan-500/15',
    },
    {
      key: 'docker',
      name: 'Docker',
      description: 'Containerização',
      accent: 'text-sky-400',
      bg: 'bg-sky-500/5',
      border: 'border-sky-500/15',
    },
    {
      key: 'cogs',
      name: 'Cogs System',
      description: 'Arquitetura modular',
      accent: 'text-purple-400',
      bg: 'bg-purple-500/5',
      border: 'border-purple-500/15',
    },
    {
      key: 'async',
      name: 'Async/Await',
      description: 'Performance assíncrona',
      accent: 'text-yellow-400',
      bg: 'bg-yellow-500/5',
      border: 'border-yellow-500/15',
    },
  ];

  readonly iconPaths: Record<TechKey, string[]> = {
    python: [
      'M8 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2H8V7Zm8 7a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-2h8v2Z',
      'M12 6.5h.01M12 17.5h.01',
    ],
    'discord.py': ['M4 6h16v10H7l-3 3V6Z', 'M9 10h2m2 0h2'],
    SQLite: [
      'M12 4c-4.4 0-8 1.8-8 4v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8c0-2.2-3.6-4-8-4Z',
      'M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4',
    ],
    docker: ['M3 12h12v3H3v-3Zm2-3h3v3H5V9Zm4 0h3v3H9V9Zm4 0h3v3h-3V9Zm4 3h4a3 3 0 0 1-3 3h-2'],
    cogs: [
      'm12 2 2.2 1 .6 2.4 2.2.9 2-1.2 1.6 1.6-1.2 2 .9 2.2 2.4.6 1 2.2-1 2.2-2.4.6-.9 2.2 1.2 2-1.6 1.6-2-1.2-2.2.9-.6 2.4L12 23l-2.2-1-.6-2.4-2.2-.9-2 1.2-1.6-1.6 1.2-2-.9-2.2-2.4-.6L1 12l1-2.2 2.4-.6.9-2.2-1.2-2L5.7 3.4l2 1.2 2.2-.9.6-2.4L12 1Zm0 7a4 4 0 1 0 .001 8.001A4 4 0 0 0 12 8Z',
    ],
    async: ['M13 2 4 14h6l-1 8 9-12h-6l1-8Z'],
  };

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

  techItemClass(index: number): string {
    return (
      'group flex items-center gap-5 p-7 border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-200 arch-reveal-up ' +
      (index % 3 !== 2 ? 'lg:border-r ' : '') +
      (index < 3 ? 'border-b ' : '') +
      'border-b last:border-b-0'
    );
  }

  iconWrapClass(tech: TechItem): string {
    return (
      'w-12 h-12 rounded-xl ' +
      tech.bg +
      ' border ' +
      tech.border +
      ' flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform'
    );
  }

  iconClass(tech: TechItem): string {
    return `w-6 h-6 ${tech.accent}`;
  }
}
