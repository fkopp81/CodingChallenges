import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DecreaseIntegerComponent } from './challenges/decreaseInteger/decreaseInteger.component'
import { UniqueLettersWindowComponent } from './challenges/unique-letters-window/unique-letters-window.component'

const routes: Routes = [
  { path: 'decreaseInteger', component: DecreaseIntegerComponent },
  {
    path: 'uniqueLettersWindowComponent',
    component: UniqueLettersWindowComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
