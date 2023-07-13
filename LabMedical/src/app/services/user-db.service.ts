import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { URLS } from "../constants/urls"

@Injectable({
	providedIn: 'root'
})
export class UserDbService {
	BASE_URL = URLS.usersEndpoints;

	constructor(private http: HttpClient) { }

	getUserByEmailAndPassword(email: string, password: string): Observable<any> {
		return this.http.post(
			`${ this.BASE_URL }/login`,
			{"email": email, "password": password},
			{observe: 'response'}
		)
	}
}