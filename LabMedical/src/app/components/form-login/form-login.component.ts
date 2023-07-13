import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { UserDbService } from "../../services/user-db.service";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined

  constructor(
    private router: Router,
    private userDb: UserDbService
    ){}

  logar(){
    let email = this.loginForm?.value.email;
    let password = this.loginForm?.value.password;

    console.log('logou');
    console.log(email);
    console.log(password);

    this.fetchUser(email, password).subscribe(user => {console.log(JSON.stringify(user))})
  }

  fetchUser(email: string, password: string): Observable<any> {
    return this.userDb.getUserByEmailAndPassword(email, password);
  }
}
