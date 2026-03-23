import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollStoryline } from './scroll-storyline';

describe('ScrollStoryline', () => {
  let component: ScrollStoryline;
  let fixture: ComponentFixture<ScrollStoryline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollStoryline],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollStoryline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
