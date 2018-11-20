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
    const charArray: Array<string> = Array.from(formValue.string)
    console.log(formValue, charArray)
    const missingChars = this.uniqueChars(charArray)
    if (missingChars.size === charArray.length)
    {
      this.subString = formValue.string
      return
    }
    const windows: Array<[number, number, Array<string>]> = []
    let prevWindow: [number, number, Array<string>]

    // Get first window
    missingChars.delete(charArray[0])
    for (let endChar = 0; endChar < charArray.length; endChar++)
    {
      const subStringCandidate: Array<string> = charArray.slice(0, endChar + 1)
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
      startChar < charArray.length;
      startChar++)
    {
      let newWindow: [number, number, Array<string>]
      const prevEndChar = prevWindow[1]
      const movedSubstring = charArray.slice(startChar, prevEndChar + 1)
      const removedChar = charArray[startChar - 1]
      console.log('startChar: ', startChar, movedSubstring, removedChar)
      if (movedSubstring.includes(removedChar))
      {
        newWindow = [startChar, prevEndChar, movedSubstring]
      } else
      {
        for (let endChar = prevEndChar + 1; endChar < charArray.length; endChar++)
        {
          if (charArray[endChar] === removedChar)
          {
            newWindow = [startChar, endChar, charArray.slice(startChar,
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
    this.subString = String(windows[0][2].join(''))
  }

  uniqueChars(string: Array<string>): Set<string>
  {
    return new Set([...string])
  }
}
