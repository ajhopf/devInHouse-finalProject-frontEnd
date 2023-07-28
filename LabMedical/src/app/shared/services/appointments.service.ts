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
			`${ environment.URL_PATIENT_APPOINTMENTS }${ patientId }`,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
		)
	}

	addAppointment(appointment: Appointment): Observable<any> {
		return this.http.post(
			`${ environment.URL_POST_APPOINTMENTS }`,
			appointment,
			{
				headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
			}
		)
	}

	updateAppointment(appointmentId: number, appointment: Appointment): Observable<any> {
		return this.http.put(
			`${ environment.URL_APPOINTMENTS }/${ appointmentId }`,
			appointment,
			{
				headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
			}
		);
	}

	deleteAppointment(appointmentId:number): Observable<any> {
		return this.http.delete(
			`${ environment.URL_APPOINTMENTS }/${ appointmentId }`,
			{
				headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
			}
		);
	}
}
