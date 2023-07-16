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

	getUserByEmail(email: string): Observable<any> {
		return this.http.get(
			`${ URLS.usersEndpoints.userIdByEmail + email } `,
			{observe: 'response'}
		)
	}

	updateUserPassword(userId: number, email: string, newPassword: string): Observable<any> {
		let requestBody = {
			id: userId,
			email: email,
			password: newPassword
		}

		return this.http.put(
			`${URLS.usersEndpoints.resetPassword}`,
			requestBody,
			{observe: 'response'})
	}
}