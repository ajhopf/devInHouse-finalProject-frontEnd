import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SystemConfigModel} from "../models/system-config.model";
import {environment} from "../../enviroments/enviroment";
import {UserService} from "./user.service";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient, private userService: UserService) { }

  getSystemConfig(): Observable<SystemConfigModel> {
    return this.http.get<SystemConfigModel>(`${environment.URL_SYSTEM_CONFIG}`);
  }

  saveSystemConfig(value: SystemConfigModel): Observable<void> {
    let user: UserModel = this.userService.getUser()
    return this.http.post<void>(`${environment.URL_SYSTEM_CONFIG}`, value, {
      headers :  {
        'Authorization': `Bearer ${user.access_token}`
      }
    });
  }

  resetSystemConfig() {
    let user: UserModel = this.userService.getUser()
    return this.http.post<void>(`${environment.URL_SYSTEM_CONFIG}/resetar`,{}, {
      headers :  {
        'Authorization': `Bearer ${user.access_token}`
      }
    });
  }
}
