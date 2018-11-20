import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueLettersWindowComponent } from './unique-letters-window.component';

describe('UniqueLettersWindowComponent', () => {
  let component: UniqueLettersWindowComponent;
  let fixture: ComponentFixture<UniqueLettersWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueLettersWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueLettersWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
