import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  logOut() {
    return from(this.afAuth.auth.signOut());
  }
 
  signIn(email: string, password: string, isRegister: boolean) {
    return isRegister ? from(this.afAuth.auth.createUserWithEmailAndPassword(email, password)) : from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
  } 

}
