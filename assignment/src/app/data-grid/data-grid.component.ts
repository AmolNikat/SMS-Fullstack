import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { City } from '../model/city';
import { CityDataService } from '../services/city-data.service';
import { CitiesDataSource } from './cities.DataSource';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = [
    'city',
    'start_date',
    'end_date',
    'price',
    'status',
    'color',
  ];
  public dataSource: CitiesDataSource;
  public originalDateFilterData = {
    startDate: null,
    endDate: null,
  };

  constructor(private cityDataService: CityDataService) {}

  ngOnInit(): void {
    this.dataSource = new CitiesDataSource(this.cityDataService);
    this.dataSource.loadCities(1);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.loadCitiesPage();
    });
    setTimeout(() => {
      this.sort.sortChange.subscribe(() => {
        this.paginator.pageIndex = 0;
      });
    }, 500);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadCitiesPage();
    });
  }

  private loadCitiesPage() {
    this.dataSource.loadCities(
      1,
      '',
      'this.sort.direction',
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  public onDateFilterDataChange(dateFilterData: any) {
    if (
      this.originalDateFilterData.startDate !== dateFilterData.startDate ||
      this.originalDateFilterData.endDate !== dateFilterData.endDate
    ) {
      this.originalDateFilterData = { ...dateFilterData };
      console.log(dateFilterData);
    }
  }

  onRowClicked(row: City) {
    // handle row click here
  }
}
