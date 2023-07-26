import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  getMedicines(patientId:any):Observable<any>{
    console.log(`ID do paciente para busca de medicamentos: ${patientId}`)
    let user = JSON.parse(localStorage.getItem("session"))
    return this.http.get(`${environment.URL_MEDICINES}?pacientId=${patientId}`,
    {
      observe: 'response',
      headers :  {
        'Authorization': `Bearer ${user.access_token}`
      }
    })
  } 

}
