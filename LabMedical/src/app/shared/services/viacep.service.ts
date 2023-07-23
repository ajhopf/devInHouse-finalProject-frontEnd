import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  constructor(private http: HttpClient) { }

  getAddress(cep: number): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}
