import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-unique-letters-window',
  templateUrl: './unique-letters-window.component.html',
  styleUrls: ['./unique-letters-window.component.css']
})
export class UniqueLettersWindowComponent implements OnInit
{
  constructor() { }
  subString = ''

  uniqueLettersWindowForm = new FormGroup({
    string: new FormControl('', Validators.required)
  })
  subStringLength() { return Array.from(this.subString).length }

  ngOnInit()
  {
  }

  solve(formValue)
  {
    // charArray for better unicode handling
    // https://flaviocopes.com/javascript-unicode/
    const charArray: Array<string> = Array.from(formValue.string)
    const missingChars = this.uniqueChars(charArray)
    if (missingChars.size === charArray.length)
    {
      this.subString = formValue.string
      return
    }
    const windows: Array<[number, number, Array<string>]> = []
    let letterWindow: [number, number, Array<string>]
    let subStringCandidate: Array<string> = []

    // Get first window
    missingChars.delete(charArray[0])
    for (let endIndex = 0; endIndex < charArray.length; endIndex++)
    {
      const endChar = charArray[endIndex]
      subStringCandidate.push(endChar)
      if (missingChars.has(endChar)) { missingChars.delete(endChar) }
      if (missingChars.size === 0)
      {
        letterWindow = [0, endIndex, subStringCandidate]
        windows.push(letterWindow)
        console.log('first Window', letterWindow)
        break
      }
    }

    // Move startIndex forward and get further windows
    for (let startIndex = 1;
      startIndex < charArray.length;
      startIndex++)
    {
      const prevEndIndex = letterWindow[1]
      subStringCandidate = [...letterWindow[2]]
      const removedChar = subStringCandidate.splice(0, 1)[0]
      letterWindow = undefined
      if (subStringCandidate.includes(removedChar))
      {
        letterWindow = [startIndex, prevEndIndex, subStringCandidate]
      } else
      {
        for (let endIndex = prevEndIndex + 1; endIndex < charArray.length;
          endIndex++)
        {
          const endChar = charArray[endIndex]
          subStringCandidate.push(endChar)
          if (endChar === removedChar)
          {
            letterWindow = [startIndex, endIndex, subStringCandidate]
            break
          }
        }
      }
      if (!letterWindow)
      {
        console.log('Stopping: No valid subString found at startIndex',
          startIndex)
        break
      }
      // console.log('startChar', startIndex, 'newWindow', newWindow)
      windows.push(letterWindow)
    }
    windows.sort((a, b) => a[2].length - b[2].length)
    console.log('windows', windows)
    this.subString = String(windows[0][2].join(''))
  }

  uniqueChars(string: Array<string>): Set<string>
  {
    return new Set([...string])
  }
}
