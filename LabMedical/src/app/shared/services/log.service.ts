import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {environment} from "../../enviroments/enviroment";
import { LogTypeEnum } from "../enums/logtype.enum";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) { }

  createLog(description: string, logType: LogTypeEnum): Observable<any> {
    return this.http.post(
      `${ environment.URL_POST_LOG }`,
      {"description": description, "logType": logType},
      {observe: 'response'}
    )
  }
}
