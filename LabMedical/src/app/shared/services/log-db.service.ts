import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { URLS } from "../constants/urls";
import { logType } from "../models/logtype.enum";

@Injectable({
  providedIn: 'root'
})
export class LogDbService {


  constructor(private http: HttpClient) { }

  createLog(description: string, logType: logType): Observable<any> {
    return this.http.post(
      `${ URLS.logsEndpoints.createLog }`,
      {"description": description, "logType": logType},
      {observe: 'response'}
    )
  }
}
