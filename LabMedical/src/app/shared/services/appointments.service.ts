import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { environment } from "../../enviroments/enviroment";
import { Appointment } from "../models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getAppointmentsByPacientId(patientId: number): Observable<any> {
    return this.http.get(
      `${environment.URL_PATIENT_APPOINTMENTS}${patientId}`,
      {headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
    )
  }

  saveAppointment(appointment: Appointment): Observable<any> {
    console.log(appointment)

    return this.http.post(
      `${environment.URL_POST_APPOINTMENTS}`,
      appointment,
      {
        headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
      }
    )
  }
}
