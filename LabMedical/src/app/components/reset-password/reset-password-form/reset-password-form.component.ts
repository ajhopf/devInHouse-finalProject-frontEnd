import { Component, ViewChild } from '@angular/core';
import { Observable, switchMap } from "rxjs";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../shared/services/user.service";

@Component({
	selector: 'reset-password-form',
	templateUrl: './reset-password-form.component.html',
	styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent {
	@ViewChild('resetPasswordForm') resetPasswordForm: NgForm | undefined

	userEmail: string = '';
	resetDone: boolean = false;

	constructor(
		private userService: UserService
	) {}

	onResetPassword() {
		this.fetchUserByEmail(this.userEmail).pipe(
			switchMap(response => {
				const userId = response.body.id;
				const userEmail = response.body.email;
				return this.resetUserPassword(userId, userEmail);
			})
		).subscribe({
				complete: () => {
					this.userEmail = '';
					this.resetDone = true;
				}
			}
		);
	}

	fetchUserByEmail(email: string): Observable<any> {
		return this.userService.getUserByEmail(email);
	}

	resetUserPassword(userId: number, email: string) {
		return this.userService.updateUserPassword(userId, email, "12345");
	}
}
