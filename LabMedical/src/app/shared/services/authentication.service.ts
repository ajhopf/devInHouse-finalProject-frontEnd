import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private jwtHelper: JwtHelperService;

	constructor(private router: Router, private http: HttpClient) {
		this.jwtHelper = new JwtHelperService();
	}

	setSession(session: Object) {
		localStorage.setItem('session',JSON.stringify(session))
	}

	getToken(): string | null {
		const sessionString = localStorage.getItem('session');

		if (sessionString) {
			const session = JSON.parse(sessionString);
			return session.token;
		}

		return null;
	}


	isTokenValid(token: string): boolean {
		return !this.jwtHelper.isTokenExpired(token);
	}

  logout() {
    this.http.get(
      `${environment.URL_LOGOUT}`,
      {
        observe: 'response',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
        }
      }
    ).subscribe()
    localStorage.clear()
    this.router.navigate(['/public/login']);
  }

}
