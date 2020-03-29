import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoicecompComponent } from './choicecomp/choicecomp.component';
import { ChoiceService } from './choicecomp/choicecomp.service';


@NgModule({
  declarations: [
    AppComponent,
    ChoicecompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ChoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
