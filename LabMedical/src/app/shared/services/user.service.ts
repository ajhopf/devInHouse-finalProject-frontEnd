import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

  private _user : any = JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
	constructor(private http: HttpClient) { }

	getUserByEmailAndPassword(email: string, password: string): Observable<any> {
		return this.http.post(
			`${ environment.URL_POST_LOGIN }`,
			{"email": email, "password": password},
			{observe: 'response'}
		);
	}

  getUser() : UserModel {
    return this._user;
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
		let user = this.getUser()
		return this.http.get(
			`${ environment.URL_GET_ALL_USERS } `,
			{
				observe: 'response',
				headers: {'Authorization': `Bearer ${user.access_token}`}
			}
		)
	}

	getUserById(id: number): Observable<any> {
		let user = this.getUser()
		return this.http.get(
			`${ environment.URL_GET_USER_BY_ID}/${id}`,
			{
				observe: 'response',
				headers: {'Authorization': `Bearer ${user.access_token}`}
			}
		)
	}

	saveUser(user: UserModel){
		let userOn = this.getUser()
		console.log(userOn.access_token)
		return this.http.post(environment.URL_POST_REGISTER_USERS,
		user,
			{
				observe: 'response',
				params: {role: userOn.role},
				headers: {'Authorization': `Bearer ${userOn.access_token}`}
			}
		)
	}

	deleteUserById(id: number): Observable<any> {
		let user = this.getUser()
		return this.http.get(
			`${ environment.URL_DEL_USER_BY_ID}/${id}`,
			{
				observe: 'response',
				headers: {'Authorization': `Bearer ${user.access_token}`}
			}
		)
	}

}
