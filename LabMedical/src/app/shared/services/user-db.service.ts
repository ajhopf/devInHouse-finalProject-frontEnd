import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { URLS } from "../constants/urls"

@Injectable({
	providedIn: 'root'
})
export class UserDbService {

	constructor(private http: HttpClient) { }

	getUserByEmailAndPassword(email: string, password: string): Observable<any> {
		return this.http.post(
			`${ URLS.usersEndpoints.login }`,
			{"email": email, "password": password},
			{observe: 'response'}
		);
	}
}