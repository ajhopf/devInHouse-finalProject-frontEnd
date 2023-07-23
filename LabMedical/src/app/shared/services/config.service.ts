import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SystemConfigModel} from "../models/system-config.model";
import {environment} from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  getSystemConfig(): Observable<SystemConfigModel> {
    return this.http.get<SystemConfigModel>(`${environment.URL_SYSTEM_CONFIG}`);
  }
}
