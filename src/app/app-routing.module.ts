import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DecreaseIntegerComponent } from './challenges/decreaseInteger/decreaseInteger.component';

const routes: Routes = [
  { path: 'decreaseInteger', component: DecreaseIntegerComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
