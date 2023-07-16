import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { UserDbService } from "../../shared/services/user-db.service";
import { AuthenticationService } from "../../shared/services/authentication.service";

@Component({
	selector: 'app-form-login',
	templateUrl: './form-login.component.html',
	styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
	@ViewChild('loginForm') loginForm: NgForm | undefined

	constructor(
		private router: Router,
		private userDb: UserDbService,
		private authenticationService: AuthenticationService
	) {}

	onLogin() {
		let email = this.loginForm?.value.email;
		let password = this.loginForm?.value.password;

		this.fetchUser(email, password).subscribe({
			next: (response) => {
				this.authenticationService.setSession(response.body);
				this.router.navigateByUrl('/home');
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
	}

	fetchUser(email: string, password: string): Observable<any> {
		return this.userDb.getUserByEmailAndPassword(email, password);
	}
}
