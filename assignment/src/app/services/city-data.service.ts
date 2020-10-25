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
    start_date: string, end_date : string, sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<any> {

    return this.http.get(`${this.baseUrl}api/cities`);
    // , {
        // params: new HttpParams()
        //     .set('courseId', `${courseId}`)
        //     .set('filter', filter)
        //     .set('sortOrder', sortOrder)
        //     .set('pageNumber', pageNumber.toString())
        //     .set('pageSize', pageSize.toString())
    // }).pipe(
    //     map(res =>  res["payload"])
    // );
}
}
