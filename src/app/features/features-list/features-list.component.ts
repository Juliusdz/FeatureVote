import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Feature } from '../interfaces/feature';
import { Observable, noop, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/auth/auth.reducer';
import { currentUser } from 'src/app/auth/auth.selectors';
import { User } from '../../interfaces/user';
import { FeaturesService } from '../services/features.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.scss']
})
export class FeaturesListComponent implements OnInit, OnDestroy {

  features$: Observable<Feature[]>;
  user: User;
  userSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private store: Store<AuthState>,
    private featuresService: FeaturesService) { }

  ngOnInit() {
    this.features$ = this.afs.collection('features').snapshotChanges().pipe(
      map(actions => {       
        return actions.map(a => {
          const data = a.payload.doc.data() as Feature;
          data.id = a.payload.doc.id;
          return data;
        })
      }))

    this.userSubscription = this.store.pipe(
      select(currentUser)
    ).subscribe(user => this.user = user)    

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  voteFeature(feature) {
    let obs$: Observable<any>;

    if (feature.likes_users.includes(this.user.id)) {
      obs$ = this.featuresService.voteFeature(feature.id, this.user.id, false)
    } else {
      obs$ = this.featuresService.voteFeature(feature.id, this.user.id, true)
    }

    obs$.subscribe(noop, err => alert(err))
  }

}
