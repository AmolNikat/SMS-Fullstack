import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFilterComponent } from '../shared/date-filter/date-filter.component';
import { DataGridComponent } from './data-grid.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DateFilterComponent,
    DataGridComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    DataGridComponent
  ]
})
export class DataGridModule { }
