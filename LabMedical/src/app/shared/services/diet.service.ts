import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/enviroments/enviroment";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class DietService{
    
    constructor(
        private http: HttpClient, private authenticationService: AuthenticationService
        ){}

    getDietByPacientId(patientId: number): Observable<any> {
        return this.http.get(
			`${ environment.URL_DIETS }`,
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()},params: {pacientId: patientId}}
		)
    }
}