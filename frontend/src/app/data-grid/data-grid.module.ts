import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFilterComponent } from '../shared/date-filter/date-filter.component';
import { DataGridComponent } from './data-grid.component';



@NgModule({
  declarations: [
    DateFilterComponent,
    DataGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DataGridComponent
  ]
})
export class DataGridModule { }
