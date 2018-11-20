import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UniqueLettersWindowComponent } from './unique-letters-window.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('UniqueLettersWindowComponent', () =>
{
  let component: UniqueLettersWindowComponent
  let fixture: ComponentFixture<UniqueLettersWindowComponent>

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations: [UniqueLettersWindowComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents()
  }))

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(UniqueLettersWindowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should find shortest window', () =>
  {
    component.solve({ string: 'ammgsaam' })
    expect(component.subString).toEqual('mgsa')
  })
})
