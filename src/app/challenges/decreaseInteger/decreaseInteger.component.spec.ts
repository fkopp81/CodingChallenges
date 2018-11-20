import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DecreaseIntegerComponent } from './decreaseInteger.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('DecreaseIntegerComponent', () =>
{
  let component: DecreaseIntegerComponent
  let fixture: ComponentFixture<DecreaseIntegerComponent>

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations: [DecreaseIntegerComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents()
  }))

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(DecreaseIntegerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () =>
  {
    expect(component).toBeTruthy()
  })
})
