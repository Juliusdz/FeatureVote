import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../services/features.service';
import { AuthState } from 'src/app/auth/auth.reducer';
import { Store, select } from '@ngrx/store';
import { currentUser } from 'src/app/auth/auth.selectors';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss']
})
export class FeatureFormComponent {

  title: string;
  user: User

  constructor(
    private featuresService: FeaturesService,
    private store: Store<AuthState>) { }

  ngOnInit() {
    this.store.pipe(
      select(currentUser)
    ).subscribe(user => this.user = user)  
  }

  save() {
    if (this.title.length) {
      this.featuresService.addFeature(this.title, this.user.id)
    } else {
      alert('Please fill the input!')
    }
  }

}
