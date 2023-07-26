import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { environment } from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getAppointmentsByPacientId(pacientId: number): Observable<any> {
    return this.http.get(
      `${environment.URL_PATIENT_APPOINTMENTS}${pacientId}`,
      {headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
    )
  }
}
