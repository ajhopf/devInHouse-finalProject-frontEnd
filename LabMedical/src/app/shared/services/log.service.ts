import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../enviroments/enviroment";
import {LogTypeEnum} from "../enums/logtype.enum";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient, private userService: UserService) {
  }

  createLog(description: string, logType: LogTypeEnum): Observable<any> {
    return this.http.post(
      `${environment.URL_POST_LOG}`,
      {"description": description, "logType": logType},
      {observe: 'response'}
    )
  }

  getAll(page: number, pageSize: number): Observable<any> {
    let user = this.userService.getUser()
    return this.http.get(
      `${environment.URL_LISTAR_LOG}`,
      {
        observe: 'response',
        headers :  {
          'Authorization': `Bearer ${user.access_token}`,
          'page': page.toString(),
          'page-size': pageSize.toString()
        }
      }
    )
  }
}
