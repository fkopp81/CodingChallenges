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
    const missingChars = this.uniqueChars(charArray)
    if (missingChars.size === charArray.length)
    {
      this.subString = formValue.string
      return
    }
    const windows: Array<[number, number, Array<string>]> = []
    let prevWindow: [number, number, Array<string>]
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
        prevWindow = [0, endIndex, subStringCandidate]
        windows.push(prevWindow)
        console.log('first Window', prevWindow)
        break
      }
    }
    // Move startIndex forward and get new windows
    for (let startIndex = 1;
      startIndex < charArray.length;
      startIndex++)
    {
      let newWindow: [number, number, Array<string>]
      const prevEndIndex = prevWindow[1]
      const prevSubString = prevWindow[2]
      subStringCandidate = prevSubString.slice(1)
      const removedChar = prevSubString[0]
      if (subStringCandidate.includes(removedChar))
      {
        newWindow = [startIndex, prevEndIndex, subStringCandidate]
      } else
      {
        for (let endIndex = prevEndIndex + 1; endIndex < charArray.length;
          endIndex++)
        {
          const endChar = charArray[endIndex]
          subStringCandidate.push(endChar)
          if (endChar === removedChar)
          {
            newWindow = [startIndex, endIndex, subStringCandidate]
            break
          }
        }
      }
      if (!newWindow)
      {
        console.log('Stopping: No valid subString found beginning at',
          startIndex)
        break
      }
      // console.log('startChar', startIndex, 'newWindow', newWindow)
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
