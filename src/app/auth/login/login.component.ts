import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Login } from '../auth.actions';

import { User } from '../../interfaces/user';

import { tap, catchError } from 'rxjs/operators';
import { noop, throwError } from 'rxjs';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  signIn(isRegister) {
    const val = this.loginForm.value;
    this.auth.signIn(val.email, val.password, isRegister).pipe(
      catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
      }),        
      tap((userCredential) => {
      let user: User = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
      }
      this.store.dispatch(new Login({user}))
      this.router.navigateByUrl('/features');
      })
    ).subscribe(noop, err => alert(err))
  }
}
