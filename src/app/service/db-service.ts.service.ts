import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class DbServiceTsService {

  constructor(private firebase:AngularFirestore) { }

  deleteDocId(docId:string,collection:string){
    console.log("Document successfully deleted!"+docId);
    this.firebase.collection(collection).doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    }
}
