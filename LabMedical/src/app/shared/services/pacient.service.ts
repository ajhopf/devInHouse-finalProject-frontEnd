import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Patient } from "../models/patient.model";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { environment } from "../../enviroments/enviroment";

@Injectable({
	providedIn: 'root'
})
export class PacientService {
	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService
	) {
	}

	createPatient(newPatient: Patient): Observable<any> {
		return this.http.post(
			environment.URL_PATIENTS,
			newPatient,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}})
	}

	getPatients(): Observable<any> {
		return this.http.get(environment.URL_PATIENTS, {
			headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
		})
	}

	getPatient(pacientId: number): Observable<any> {
		return this.http.get(
			`${environment.URL_PATIENTS}/${pacientId}`,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
		)
	}

	getPatientByName(pacient: Patient): Observable<any> {
		return this.http.get(`${environment.URL_PATIENTS}?identification.pacientName=${ pacient.name }`)
	}


	editPatient(patient: Patient): Observable<any> {
		return this.http.put(
			`${environment.URL_PATIENTS}/${ patient.id }`,
			patient,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
		)
	}

	deletePatient(patientId: string): Observable<any> {
		return this.http.delete(`${environment.URL_PATIENTS}/${ patientId }`)
	}
}
