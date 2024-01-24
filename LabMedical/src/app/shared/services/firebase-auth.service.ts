import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private auth: AngularFireAuth) { }

  createNewUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
    // this.auth.createUserWithEmailAndPassword(email, password)
    //   .then((res) => {
    //     console.log('sign up successful');
    //     console.log(res);
    //   })
    //   .catch(error => console.error(error));
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuthenticated() {
    console.log(this.auth.currentUser);
    console.log(this.auth.authState);

    return this.auth.authState;
  }
}
