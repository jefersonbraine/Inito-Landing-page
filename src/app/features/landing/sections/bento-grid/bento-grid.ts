import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-bento-grid',
  imports: [],
  templateUrl: './bento-grid.html',
  styleUrl: './bento-grid.css',
})
export class BentoGrid implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

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
    if (!this.isBrowser) {
      return;
    }

    this.observer?.disconnect();
    this.observer = null;
  }
}
