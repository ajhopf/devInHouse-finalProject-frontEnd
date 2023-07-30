import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/enviroments/enviroment";
import { AuthenticationService } from "./authentication.service";
import { DietModel } from "../models/diet.model";

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
			{headers: {"Authorization": "Bearer " + this.authenticationService.getToken()},params: {pacient: patientId}}
		)
    }

    updateDiet(id: number, diet: DietModel): Observable<any> {
        return this.http.put(
            `${environment.URL_DIETS}/${id}`,
            diet,
            {headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
        )
    }

    addDiet(diet: DietModel): Observable<any> {
        return this.http.post(
            `${environment.URL_DIETS}`,
            diet,
            {headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}}
        )
    }

    deleteDiet(id: number){
        return this.http.delete(
			`${ environment.URL_DIETS }/${id}`,
			{
				headers: {"Authorization": "Bearer " + this.authenticationService.getToken()}
			}
		);
    }
}