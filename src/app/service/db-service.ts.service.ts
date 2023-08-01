import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DbServiceTsService {

  constructor(private firebase:AngularFirestore) { }

  deleteDocId(docId:string,collection:string){
    
    this.firebase.collection(collection).doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    }

    addData(colName:any,dataArr: unknown){
      this.firebase.collection(colName).add(dataArr)
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
    }
}
