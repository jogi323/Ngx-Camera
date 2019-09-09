import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { WebcamComponent } from './webcam.component';

@NgModule({
  declarations: [WebcamComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  exports: [WebcamComponent]
})
export class WebcamModule { }
