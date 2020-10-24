import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpParams} from "@angular/common/http";

import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class CityDataService {

  constructor(private http:HttpClient) { }

 public findCities(
    courseId:number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<City[]> {
  return of([{
    "_id": 1,
    "city": "Neftegorsk",
    "start_date": "4/13/2013",
    "end_date": "5/18/2013",
    "price": "55.82",
    "status": "Seldom",
    "color": "#fd4e19"
  },
  {
    "_id": 2,
    "city": "Lancai",
    "start_date": "5/19/2012",
    "end_date": "11/29/2014",
    "price": "22.49",
    "status": "Yearly",
    "color": "#ff5055"
  }]);

    // return this.http.get('/api/cities', {
    //     params: new HttpParams()
    //         .set('courseId', courseId.toString())
    //         .set('filter', filter)
    //         .set('sortOrder', sortOrder)
    //         .set('pageNumber', pageNumber.toString())
    //         .set('pageSize', pageSize.toString())
    // }).pipe(
    //     map(res =>  res["payload"])
    // );
}
}
