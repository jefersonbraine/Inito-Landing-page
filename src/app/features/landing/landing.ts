import { Component } from '@angular/core';
import { HeroSection } from './sections/hero-section/hero-section';
import { Footer } from '../../layout/footer/footer';
import { BentoGrid } from './sections/bento-grid/bento-grid';
import { Features } from './sections/features/features';
import { LiveTerminal } from './sections/live-terminal/live-terminal';
import { Architecture } from './sections/architecture/architecture';
import { Roadmap } from './sections/roadmap/roadmap';

@Component({
  selector: 'app-landing',
  imports: [HeroSection, Footer, BentoGrid, Features, LiveTerminal, Architecture, Roadmap],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
