import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../enviroments/enviroment";

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
