import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
