import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Roadmap } from './roadmap';

describe('Roadmap', () => {
  let component: Roadmap;
  let fixture: ComponentFixture<Roadmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roadmap],
    }).compileComponents();

    fixture = TestBed.createComponent(Roadmap);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the roadmap title', () => {
    const title = fixture.debugElement.query(By.css('h2'));

    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toContain('Futuro');
  });

  it('should render all milestones from component data', () => {
    const milestones = fixture.debugElement.queryAll(
      By.css('ol[aria-label="Marcos do roadmap"] li'),
    );

    expect(milestones.length).toBe(component.milestones.length);
  });

  it('should render all stats from component data', () => {
    const stats = fixture.debugElement.queryAll(By.css('ul[aria-label="Metricas do sistema"] li'));

    expect(stats.length).toBe(component.stats.length);
  });
});
