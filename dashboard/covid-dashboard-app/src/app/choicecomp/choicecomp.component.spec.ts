import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicecompComponent } from './choicecomp.component';

describe('ChoicecompComponent', () => {
  let component: ChoicecompComponent;
  let fixture: ComponentFixture<ChoicecompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicecompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
