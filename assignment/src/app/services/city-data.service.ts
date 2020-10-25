import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpParams} from "@angular/common/http";

import { City } from '../model/city';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityDataService {
private readonly baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

 public findCities(
  start_date: string, end_Date: string, sortColumn: string,
  sortDirection: string, pageNumber: string, pageSize: string):  Observable<any> {

    return this.http.get(`${this.baseUrl}api/cities`
    , {
        params: new HttpParams()
            .set('pageNumber', `${pageNumber}`)
            .set('pageSize', `${pageSize}`)
            .set('sortColumn', sortColumn)
            .set('sortDirection', sortDirection)
            .set('start_date', start_date)
            .set('end_Date', end_Date)
    });
}
}
