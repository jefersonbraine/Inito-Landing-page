import { Component } from '@angular/core';
import { HeroSection } from './sections/hero-section/hero-section';
import { Footer } from '../../layout/footer/footer';
import { BentoGrid } from './sections/bento-grid/bento-grid';
import { Features } from './sections/features/features';

@Component({
  selector: 'app-landing',
  imports: [HeroSection, Footer, BentoGrid, Features],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
