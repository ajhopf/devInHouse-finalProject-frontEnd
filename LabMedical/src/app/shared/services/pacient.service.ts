import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pacient } from "../models/pacient.model";
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

	createPacient(newPacient: Pacient): Observable<any> {
		return this.http.post(
			environment.URL_PACIENTS,
			newPacient,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}})
	}

	getPacients(): Observable<any> {
		return this.http.get(environment.URL_PACIENTS, {
			headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
		})
	}

	getPacient(pacientId: number): Observable<any> {
		return this.http.get(
			`${environment.URL_PACIENTS}/${pacientId}`,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
		)
	}

	getPacientByName(pacient: Pacient): Observable<any> {
		return this.http.get(`${environment.URL_PACIENTS}?identification.pacientName=${ pacient.name }`)
	}


	editPacient(pacient: Pacient): Observable<any> {
		return this.http.put(`${environment.URL_PACIENTS}/${ pacient.id }`, pacient)
	}

	deletePacient(pacientId: string): Observable<any> {
		return this.http.delete(`${environment.URL_PACIENTS}/${ pacientId }`)
	}
}
