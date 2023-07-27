import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class MedicationsService {
	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService
	) { }

	getMedicationsByPatientId(patientId: number): Observable<any> {
		return this.http.get(
			`http://localhost:8080/api/medicamentos?id=${patientId}`,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
		)
	}
}