import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { DecreaseIntegerComponent } from './challenges/decreaseInteger/decreaseInteger.component'
import { UniqueLettersWindowComponent } from './challenges/unique-letters-window/unique-letters-window.component'

export const AppConfig = {
  declarations: [
    AppComponent,
    NavbarComponent,
    DecreaseIntegerComponent,
    UniqueLettersWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
}
@NgModule(AppConfig)
export class AppModule { }
