import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InitoLogo3d } from '../inito-logo3d/inito-logo3d';

@Component({
  selector: 'app-hero-section',
  imports: [InitoLogo3d],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  readonly stats = signal([
    { value: '24/7', label: 'Disponibilidade' },
    { value: 'Python', label: 'Linguagem principal' },
    { value: 'IA', label: 'Mentor integrado' },
    // { value: '100%', label: 'Open Source' },
  ]);
}
