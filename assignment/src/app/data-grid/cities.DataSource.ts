import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {CityDataService} from "../services/city-data.service";
import {catchError, finalize} from "rxjs/operators";

import { City } from '../model/city';

export class CitiesDataSource implements DataSource<City> {

  private citiesSubject = new BehaviorSubject<City[]>([]);
  private citiesCountSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public citiesCount$ = this.citiesCountSubject.asObservable();

  constructor(private cityDataService: CityDataService) {}

  connect(collectionViewer: CollectionViewer): Observable<City[]> {
      return this.citiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.citiesSubject.complete();
      this.loadingSubject.complete();
  }

  loadCities(start_date = '', end_Date = '', sortColumn ='',
    sortDirection = '', pageIndex = '1', pageSize = '5') {

      this.loadingSubject.next(true);
      this.cityDataService.findCities(start_date,end_Date, sortColumn, sortDirection,
          pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(cities => {
        this.citiesSubject.next(cities.payload);
        this.citiesCountSubject.next(cities.totalCount);
      });
  }
}
