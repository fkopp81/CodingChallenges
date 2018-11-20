import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-unique-letters-window',
  templateUrl: './unique-letters-window.component.html',
  styleUrls: ['./unique-letters-window.component.css']
})
export class UniqueLettersWindowComponent implements OnInit
{
  subString = ''
  uniqueLettersWindowForm = new FormGroup({
    string: new FormControl('', Validators.required)
  })
  constructor() { }

  ngOnInit()
  {
  }

  solve(formValue)
  {
    const string: Array<string> = [...formValue.string]
    console.log(formValue)
    const uniqueChars = this.uniqueChars(string)
    console.log('uniqueChars', uniqueChars)
    if (uniqueChars.size === string.length)
    {
      this.subString = formValue.string
      return
    }
    const windows: Array<[number, number, Array<string>]> = []
    const missingChars = new Set(uniqueChars)
    let prevWindow: [number, number, Array<string>]

    // Get first window
    missingChars.delete(string[0])
    for (let endChar = 1; endChar < string.length; endChar++)
    {
      const subStringCandidate: Array<string> = string.slice(0, endChar + 1)
      // tslint:disable-next-line:prefer-const
      // for (let value of missingChars)
      const missingCharsValues = missingChars.values()
      for (let element = missingCharsValues.next(); !element.done;
        element = missingCharsValues.next())
      {
        const { value } = element
        if (subStringCandidate.includes(value))
        {
          missingChars.delete(value)
        }
      }
      console.log(`[0,${endChar}]`, subStringCandidate, missingChars)
      if (missingChars.size === 0)
      {
        prevWindow = [0, endChar, subStringCandidate]
        windows.push(prevWindow)
        console.log('first Window', prevWindow, subStringCandidate)
        break
      }
    }
    for (let startChar = 1;
      startChar < string.length;
      startChar++)
    {
      let newWindow: [number, number, Array<string>]
      const prevEndChar = prevWindow[1]
      const movedSubstring = string.slice(startChar, prevEndChar + 1)
      const removedChar = string[startChar - 1]
      console.log('startChar: ', startChar, movedSubstring, removedChar)
      if (movedSubstring.includes(removedChar))
      {
        newWindow = [startChar, prevEndChar, movedSubstring]
      } else
      {
        for (let endChar = prevEndChar + 1; endChar < string.length; endChar++)
        {
          if (string[endChar] === removedChar)
          {
            newWindow = [startChar, endChar, string.slice(startChar,
              endChar + 1)]
            continue
          }
        }
      }
      if (!newWindow)
      {
        console.log('Stopping: No valid subString found beginning at',
          startChar)
        break
      }
      console.log('startChar', startChar, 'newWindow', newWindow)
      windows.push(newWindow)
      prevWindow = newWindow
    }
    windows.sort((a, b) => a[2].length - b[2].length)
    console.log('windows', windows)
    this.subString = String(windows[0][2])
  }

  uniqueChars(string): Set<string>
  {
    return new Set([...string])
  }
}
