import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface RoadmapMilestone {
  quarter: string;
  datetime: string;
  item: string;
}

interface RoadmapStat {
  label: string;
  value: string;
}

@Component({
  selector: 'app-roadmap',
  imports: [],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Roadmap implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private observer: IntersectionObserver | null = null;

  readonly milestones: RoadmapMilestone[] = [
    {
      quarter: 'Q4 2026',
      datetime: '2026-Q4',
      item: 'Análise contextual de mensagens em tempo real',
    },
    {
      quarter: 'Q1 2027',
      datetime: '2027-Q1',
      item: 'Sugestões inteligentes de ações moderativas',
    },
    {
      quarter: 'Q2 2027',
      datetime: '2027-Q2',
      item: 'Dashboard de revisão para moderadores',
    },
    {
      quarter: 'Q3 2027',
      datetime: '2027-Q3',
      item: 'Aprendizado continuo com feedback humano',
    },
  ];

  readonly stats: RoadmapStat[] = [
    { label: 'Analisadas', value: '1,247' },
    { label: 'Bloqueadas', value: '38' },
    { label: 'Precisao', value: '97%' },
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const animated = this.host.nativeElement.querySelectorAll('[data-reveal]');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                entry.target.classList.add('is-visible');
              });
            });
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
    if (!this.isBrowser) {
      return;
    }

    this.observer?.disconnect();
    this.observer = null;
  }
}
