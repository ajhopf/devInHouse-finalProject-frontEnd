import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";

import { UserModel } from "../models/user.model";
import { environment } from "../../enviroments/enviroment";

@Injectable({
	providedIn: 'root'
})
export class UserService {

  private emptyUser : UserModel = {
    name: '',
    photoUrl: '',
    password: '',
    email : '',
  }

	constructor(private http: HttpClient) { }

	getUserByEmailAndPassword(email: string, password: string): Observable<any> {
		return this.http.post(
			`${ environment.URL_POST_LOGIN }`,
			{"email": email, "password": password},
			{observe: 'response'}
		);
	}

  getUser() : UserModel {
    return JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
  }

	getUserByEmail(email: string): Observable<any> {
		return this.http.get(
			`${ environment.URL_POST_USER_BY_EMAIL + email } `,
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
			`${ environment.URL_POST_RESET_PASSWORD }`,
			requestBody,
			{observe: 'response'})
	}

	getUsersList(): Observable<any> {
		let user = JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
		return this.http.get(
			`${ environment.URL_GET_ALL_USERS } `,
			{
				observe: 'response',
				headers: {'Authorization': `Bearer ${user.access_token}`}
			}
		)
	}

	getUserById(id: number): Observable<any> {
		let user = JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
		return this.http.get(
			`${ environment.URL_GET_USER_BY_ID}/${id}`,
			{
				observe: 'response',
				headers: {'Authorization': `Bearer ${user.access_token}`}
			}
		)
	}

	saveUser(user: UserModel): Observable<any> {
		let userAdmin = JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
		return this.http.post(environment.URL_POST_REGISTER_USERS,
		user,
			{
				observe: 'response',
				params: {role: userAdmin.role},
				headers: {'Authorization': `Bearer ${userAdmin.access_token}`}
			}
		)
	}

	updateUser(id:number, user: UserModel): Observable<string> {
		let userAdmin = JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
		return this.http.put(
			`${environment.URL_PUT_UPDATE_USER}/${id}`,
			user,
			{
				observe: 'response',
				headers: {
					'Authorization': `Bearer ${userAdmin.access_token}`,
					'Content-Type': 'application/json'
				},
				responseType: 'text',
			}
		).pipe(
			map((response: HttpResponse<string>) => response.body)
		)
	}

	deleteUserById(id: number): Observable<string> {
		let userAdmin = JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
		return this.http.delete(
			`${ environment.URL_DEL_USER_BY_ID}/${id}`,
			{
				observe: 'response',
				headers: {
					'Authorization': `Bearer ${userAdmin.access_token}`,
					'Content-Type': 'application/json'
				},
				responseType: 'text'
			}
		).pipe(
			map((response: HttpResponse<string>) => response.body)
		)
	}

}
