import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Features } from './features';

describe('Features', () => {
  let component: Features;
  let fixture: ComponentFixture<Features>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features],
    }).compileComponents();

    fixture = TestBed.createComponent(Features);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main features heading', () => {
    const title = fixture.debugElement.query(By.css('h2'));

    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toContain('Tudo');
  });

  it('should render one feature title for each feature in the signal', () => {
    const featureTitles = fixture.debugElement.queryAll(By.css('h3'));

    expect(featureTitles.length).toBe(component.features().length);
  });
});
