import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BentoGrid } from './bento-grid';

describe('BentoGrid', () => {
  let component: BentoGrid;
  let fixture: ComponentFixture<BentoGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BentoGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(BentoGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section title', () => {
    const title = fixture.debugElement.query(By.css('h2'));

    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toContain('Inito');
  });

  it('should render all bento cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));

    expect(cards.length).toBe(3);
  });
});
