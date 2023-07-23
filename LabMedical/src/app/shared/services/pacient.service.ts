import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pacient } from "../models/pacient.model";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
	providedIn: 'root'
})
export class PacientService {

	BASE_URL = 'http://localhost:8080/api/pacientes'

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService
	) {
	}

	createPacient(newPacient: Pacient): Observable<any> {
		return this.http.post(
			this.BASE_URL,
			newPacient,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}})
	}

	getPacients(): Observable<any> {
		return this.http.get(this.BASE_URL, {
			headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
		})
	}

	getPacient(pacientId: number): Observable<any> {
		return this.http.get(
			`${this.BASE_URL }/${ pacientId }`,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
		)
	}

	getPacientByName(pacient: Pacient): Observable<any> {
		return this.http.get(`${ this.BASE_URL }?identification.pacientName=${ pacient.name }`)
	}


	editPacient(pacient: Pacient): Observable<any> {
		return this.http.put(`${ this.BASE_URL }/${ pacient.id }`, pacient)
	}

	deletePacient(pacientId: string): Observable<any> {
		return this.http.delete(`${ this.BASE_URL }/${ pacientId }`)
	}
}
