import { Component } from '@angular/core';
import { HeroSection } from './sections/hero-section/hero-section';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-landing',
  imports: [HeroSection, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
