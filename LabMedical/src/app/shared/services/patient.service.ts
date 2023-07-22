import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../enviroments/enviroment";
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private emptyUser : UserModel = {
    name: '',
    photoUrl: '',
    password: '',
    email : '',
  }

  constructor(private http: HttpClient, private userService: UserService) { }

  getPatientes():Observable<any>{
    let user = JSON.parse(localStorage.getItem("session") || JSON.stringify(this.emptyUser))
    console.log(user.access_token)
    return this.http.get(`${environment.URL_PATIENTS}`,
    {
      observe: 'response',
      headers :  {
        'Authorization': `Bearer ${user.access_token}`
      }
    })
  } 
}
