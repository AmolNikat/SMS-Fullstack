import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFilterComponent implements OnInit {
  public dateForm: FormGroup;
  @Output() dateFilterData = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.createDateForm();
  }

  private createDateForm() {
    this.dateForm = new FormGroup({
      startDate: new FormControl('', {
        validators: [Validators.required],
      }),
      endDate: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  public applyDateFilter() {
    if (this.dateForm.valid) {
      this.dateFilterData.emit(this.dateForm.value);
    }
  }
}
