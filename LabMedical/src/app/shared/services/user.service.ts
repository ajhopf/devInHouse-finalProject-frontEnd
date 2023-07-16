import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import {UserModel} from "../models/user.model";
import {environment} from "../../enviroments/enviroment";

@Injectable({
	providedIn: 'root'
})
export class UserService {

  private emptyUser : UserModel = {
    name: '',
    photoUrl: '',
    password: '',
    email : '',
    role: ''
  }

  private _user : any = JSON.parse(sessionStorage.getItem('user') || JSON.stringify(this.emptyUser))
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
}
