import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { City } from '../model/city';
import { CityDataService } from '../services/city-data.service';
import { CitiesDataSource } from './cities.DataSource';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;
  public displayedColumns: string[] = [
    'city',
    'start_date',
    'end_date',
    'price',
    'status',
    'color',
  ];
  public dataSource: CitiesDataSource;

  constructor(private cityDataService: CityDataService) {}

  ngOnInit(): void {
    this.dataSource = new CitiesDataSource(this.cityDataService);
    this.dataSource.loadCities(1);
  }
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      console.log('page changes', this.paginator);
      this.loadCitiesPage();
    });
    // setTimeout(() => {
      this.sort.sortChange.subscribe(() =>  {
        this.paginator.pageIndex = 0;
      });
    // },);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadCitiesPage();
    })
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
  onRowClicked(row: City) {
    console.log('Row clicked: ', row);
  }
}
