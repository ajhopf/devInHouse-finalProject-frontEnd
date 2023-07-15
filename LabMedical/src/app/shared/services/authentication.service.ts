import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private jwtHelper: JwtHelperService;

	constructor(private router: Router) {
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
		// TODO Enviar requisição para o back para desativar o token
		localStorage.clear()
		this.router.navigate(['/public/login']);
	}

}