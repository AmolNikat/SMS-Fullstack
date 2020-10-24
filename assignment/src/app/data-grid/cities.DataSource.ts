import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {CityDataService} from "../services/city-data.service";
import {catchError, finalize} from "rxjs/operators";

import { City } from '../model/city';

export class CitiesDataSource implements DataSource<City> {

  private citiesSubject = new BehaviorSubject<City[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private cityDataService: CityDataService) {}

  connect(collectionViewer: CollectionViewer): Observable<City[]> {
      return this.citiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.citiesSubject.complete();
      this.loadingSubject.complete();
  }

  loadCities(courseId: number, filter = '',
              sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

      this.loadingSubject.next(true);

      this.cityDataService.findCities(courseId, filter, sortDirection,
          pageIndex, pageSize).pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(cities => this.citiesSubject.next(cities));
  }
}
