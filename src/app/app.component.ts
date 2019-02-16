import { Component } from '@angular/core';
import {isLoggedIn} from './auth/auth.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { AuthService } from './auth/auth.service';
import { Logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isloggedIn: boolean;

  constructor(private store: Store<AppState>, private auth: AuthService) {}

  ngOnInit() {
    this.store.pipe(select(isLoggedIn))
      .subscribe(loggedIn => this.isloggedIn = loggedIn)    
  }

  logout() {
    this.auth.logOut().subscribe(() => {
      this.store.dispatch(new Logout());
    })
  }
}