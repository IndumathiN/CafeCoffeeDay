import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, map, Observable } from 'rxjs';
import { CustomData } from '../model/customData.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private firebase: AngularFirestore) { }

  getUpdatedData(ollection_name:string): Observable<any[]> {
    return this.firebase.collection(ollection_name).valueChanges();
  }

  getUserSettings(userID: string): Observable<any> {

   
    const settingsDocRef = this.firebase.doc(`dairy/${userID}`);
    return settingsDocRef.valueChanges();
}
}
