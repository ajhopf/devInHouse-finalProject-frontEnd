import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroUserService {

  constructor() { }

  cadastrarUser(newUser:Object){
    const users = localStorage.getItem('users')
    let usersArray = []
    if(users){
      usersArray = JSON.parse(users)
      usersArray.push(this.setID(newUser, usersArray.length))
    }else{
      newUser = this.setID(newUser,0)
      usersArray = [newUser]
    }
    localStorage.setItem('users',JSON.stringify(usersArray))
  }

  setID(user:any,ID:number):Object{
    user.ID = ID
    return user
  }

  setSession(session:Object){
    localStorage.setItem('session',JSON.stringify(session))
  }

  getSession(){
    const sessionJSON = localStorage.getItem('session')
    let session = 'not logged'
    if(sessionJSON){
      session = JSON.parse(sessionJSON)
    }
    return session
  }

  cleanSession(){
    localStorage.removeItem('session')
  }

  getUsers(){
      return localStorage.getItem('users')
  }
}
