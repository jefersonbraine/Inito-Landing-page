import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LiveTerminal } from './live-terminal';

describe('LiveTerminal', () => {
  let component: LiveTerminal;
  let fixture: ComponentFixture<LiveTerminal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveTerminal],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveTerminal);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the live terminal title', () => {
    const title = fixture.debugElement.query(By.css('h2'));

    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toContain('Inito');
  });

  it('should render all stat rows from component data', () => {
    const statRows = fixture.debugElement.queryAll(By.css('span.text-gray-600.text-sm'));

    expect(statRows.length).toBe(component.stats.length);
  });
});
