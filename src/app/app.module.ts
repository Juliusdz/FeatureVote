import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
// import { AppEffects } from './app.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'features',
    loadChildren: './features/features.module#FeaturesModule',
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: 'features'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }),
    // EffectsModule.forRoot([AppEffects]),    
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    EffectsModule.forRoot([]),
    AngularFirestoreModule,
    
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
