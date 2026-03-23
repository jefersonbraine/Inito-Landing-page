import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-scroll-storyline',
  imports: [],
  templateUrl: './scroll-storyline.html',
  styleUrl: './scroll-storyline.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollStoryline implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private trackElement: HTMLElement | null = null;
  private animationFrame: number | null = null;
  private readonly targetProgress = signal(0);
  private readonly smoothProgress = signal(0);

  readonly progress = computed(() => this.smoothProgress());
  readonly pathDashOffset = computed(() => 100 - this.progress() * 100);
  readonly dotTop = computed(() => `${this.progress() * 100}%`);

  ngAfterViewInit(): void {
    this.trackElement = this.host.nativeElement.querySelector(
      '[data-storyline-track]',
    ) as HTMLElement | null;

    this.updateTargetProgress();
    window.addEventListener('scroll', this.handleViewportChange, { passive: true });
    window.addEventListener('resize', this.handleViewportChange, { passive: true });
    this.startAnimationLoop();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleViewportChange);
    window.removeEventListener('resize', this.handleViewportChange);
    this.stopAnimationLoop();
  }

  private readonly handleViewportChange = (): void => {
    this.updateTargetProgress();
    this.startAnimationLoop();
  };

  private updateTargetProgress(): void {
    const element = this.trackElement;

    if (!element) {
      this.targetProgress.set(0);
      return;
    }

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const denominator = viewportHeight + rect.height;

    if (denominator <= 0) {
      this.targetProgress.set(0);
      return;
    }

    const raw = (viewportHeight - rect.top) / denominator;
    const clamped = Math.max(0, Math.min(1, raw));
    this.targetProgress.set(clamped);
  }

  private startAnimationLoop(): void {
    if (this.animationFrame !== null) {
      return;
    }

    const tick = () => {
      const current = this.smoothProgress();
      const target = this.targetProgress();
      const next = current + (target - current) * 0.14;

      if (Math.abs(target - next) < 0.001) {
        this.smoothProgress.set(target);
        this.stopAnimationLoop();
        return;
      }

      this.smoothProgress.set(next);
      this.animationFrame = window.requestAnimationFrame(tick);
    };

    this.animationFrame = window.requestAnimationFrame(tick);
  }

  private stopAnimationLoop(): void {
    if (this.animationFrame === null) {
      return;
    }

    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }
}
