import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-decreaseInteger',
  templateUrl: './decreaseInteger.component.html',
  styleUrls: ['./decreaseInteger.component.css']
})
export class DecreaseIntegerComponent implements OnInit
{
  steps = -1
  form321 = new FormGroup({
    integer: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.pattern('^\d+$')])
      // Validators.required
    )
  })
  constructor() { }

  ngOnInit()
  {
  }

  solve(formValue)
  {
    const { integer } = formValue
    this.steps = -1
    console.log(formValue)
    if (integer < 1)
    {
      console.error('Integer not positive.')
      return
    }
    let row = [integer]
    let level = 0
    // tslint:disable-next-line:prefer-const
    let numbers = []
    let finished = false
    while (true)
    {
      level++
      const newRow = []
      row.forEach((value) =>
      {
        if (numbers.includes(value) || finished) { return }
        numbers.push(value)
        const newSubRow = [value - 1, ...this.getLargerMultiplicators(value)]
        if (newSubRow.includes(1)) { finished = true }
        newRow.push(...newSubRow)
      })
      console.log(level, newRow)
      if (finished) { break }
      if (level > 1000)
      {
        console.error('bailing at level', level)
        this.steps = -9
        return
      }
      row = newRow
    }
    this.steps = level
  }

  getLargerMultiplicators(dividend)
  {
    const largerMultiplicators = new Set
    for (let divisor = 2; divisor <= dividend / 2; divisor++)
    {
      // console.log("largerMultiplicators", divisor, dividend % divisor)
      if (dividend % divisor === 0)
      {
        const quotient = dividend / divisor
        largerMultiplicators.add(Math.max(quotient, divisor))
      }
    }
    return Array.from(largerMultiplicators)
  }


}
