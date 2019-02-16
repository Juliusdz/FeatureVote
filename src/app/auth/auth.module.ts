import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: 'login', component: LoginComponent}]),
    StoreModule.forFeature('auth', fromAuth.authReducer),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule, 
    ReactiveFormsModule, 
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    LoginComponent,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
              AuthGuard
            ]
        }
    }
}
