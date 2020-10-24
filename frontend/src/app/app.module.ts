import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { DataGridModule } from './data-grid/data-grid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    DataGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
