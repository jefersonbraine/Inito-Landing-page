import { Component } from '@angular/core';
import { HeroSection } from './features/landing/sections/hero-section/hero-section';

@Component({
  selector: 'app-root',
  imports: [HeroSection],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
