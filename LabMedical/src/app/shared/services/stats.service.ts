import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import {environment} from "../../enviroments/enviroment";
import { newMedicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getStats():Observable<any>{
    let user = JSON.parse(localStorage.getItem("session"))
    return this.http.get(`${environment.URL_STATS}`,{
      observe: 'response',
      headers :  {
        'Authorization': `Bearer ${user.access_token}`
      }
    })
  } 
  
}
