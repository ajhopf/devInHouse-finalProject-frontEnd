import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { UserDbService } from "../../shared/services/user-db.service";
import { LogDbService } from "../../shared/services/log-db.service";
import { logType } from "../../shared/models/logtype.enum";
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
		private logDb: LogDbService,
		private authenticationService: AuthenticationService
	) {}

	logar() {
		let email = this.loginForm?.value.email;
		let password = this.loginForm?.value.password;

		this.fetchUser(email, password).subscribe({
			next: (response) => {
				const role = response.body.role.substring(5);
				const userName = response.body.name;
				const logDescription ='O(a) '+ role + ' ' + userName + ' efetuou login no sistema';

				this.createSuccesLog(logDescription);

				this.authenticationService.setSession(response.body);
				this.router.navigateByUrl('/home');
			},
			error: (err) => {
				console.error({status: err.status, message: err.error})

			}
		})

	}

	fetchUser(email: string, password: string): Observable<any> {
		return this.userDb.getUserByEmailAndPassword(email, password);
	}

	createSuccesLog(description: string): void {
		this.logDb.createLog(description, logType.SUCCES).subscribe({
			error: error => {alert(error)}
	});
	}
}
