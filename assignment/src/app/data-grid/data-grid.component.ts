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
import { formatDate } from '../utils/date-utils';

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

  public pageSizeOptions = [5, 10, 25, 100];
  public pageCount = 100;

  constructor(private cityDataService: CityDataService) {}

  ngOnInit(): void {
    this.dataSource = new CitiesDataSource(this.cityDataService);
    this.dataSource.loadCities('1');
    this.dataSource.citiesCount$.subscribe((count: number) => {
      this.pageCount = count;
    })
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.loadCitiesPage();
    });
    setTimeout(() => {
      this.sort.sortChange.subscribe((value) => {
        console.log(value);
        this.paginator.pageIndex = 0;
      });
    }, 500);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadCitiesPage();
    });
  }

  private loadCitiesPage() {
    this.dataSource.loadCities(
      null,
      null,
      this.sort.active,
      this.sort.direction,
      `${this.paginator.pageIndex + 1}`,
      `${this.paginator.pageSize}`
    );
  }

  public onDateFilterDataChange(dateFilterData: any) {
    if (
      this.originalDateFilterData.startDate !== dateFilterData.startDate ||
      this.originalDateFilterData.endDate !== dateFilterData.endDate
    ) {
      this.originalDateFilterData = { ...dateFilterData };

      this.dataSource.loadCities(formatDate(dateFilterData.startDate),formatDate(dateFilterData.endDate), '', '','1', '5');
    }
  }
}
