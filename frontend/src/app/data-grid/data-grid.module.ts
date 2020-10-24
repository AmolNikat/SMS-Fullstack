import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFilterComponent } from '../shared/date-filter/date-filter.component';
import { DataGridComponent } from './data-grid.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DateFilterComponent,
    DataGridComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    DataGridComponent
  ]
})
export class DataGridModule { }
