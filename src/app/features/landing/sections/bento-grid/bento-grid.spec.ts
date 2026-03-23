import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
