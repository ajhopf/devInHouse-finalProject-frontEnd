import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private jwtHelper: JwtHelperService;

	constructor() {
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

	decodeToken(token: string): any {
		return this.jwtHelper.decodeToken(token);
	}

	isTokenValid(token: string): boolean {
		return !this.jwtHelper.isTokenExpired(token);
	}

}