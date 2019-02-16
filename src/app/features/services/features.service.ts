import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FeaturesModule } from '../features.module';
import { Feature } from '../interfaces/feature';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: FeaturesModule
})
export class FeaturesService {

  constructor(private afs: AngularFirestore) { }

  getFeatures() {
    return this.afs.collection('features').valueChanges();
  }

  getUserFeatures(userId) {
    return this.afs.collection('features', ref => ref.where('userId', '==', userId)).valueChanges();
  }

  addFeature(title, userId) {
      let feature: Feature = {
        title,
        userId,
        likesCount: 0,
        likes_users: []        
      }
    return from(this.afs.collection('features').add(feature));
  }

  voteFeature(featureId, userId, isLike) {
    return this.afs.doc(`features/${featureId}`).valueChanges().pipe(
        take(1),
        switchMap((data: any) => {
            let updated = { ...data };
            if (isLike) {
                updated.likesCount += 1;
                updated.likes_users.push(userId);
            } else {
                updated.likesCount -= 1;
                updated.likes_users.splice(updated.likes_users.indexOf(userId), 1);
            }
            return from(this.afs.doc(`features/${featureId}`).update(updated));
        })
    )
  }
}
