import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { UserService } from "../../shared/services/user.service";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined;
  private basePath = '/users';

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseAuth: FirebaseAuthService,
  ) { }

  onLogin() {
    let email = this.loginForm?.value.email;
    let password = this.loginForm?.value.password;

    this.firebaseAuth.login(email, password)
      .then((response) => {
        console.log(response);
        this.authenticationService.setSession(response);
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.');
        console.error(error);
      });


    // this.fetchUser(email, password).subscribe({
    //   next: (response) => {
    //     this.authenticationService.setSession(response.body);
    //     this.router.navigateByUrl('/home');
    //   },
    //   error: (err) => {
    //     alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.');
    //     console.error({ status: err.status, message: err.error });
    //   }
    // });
  }

  fetchUser(email: string, password: string): Observable<any> {
    return this.userService.getUserByEmailAndPassword(email, password);
  }
}
