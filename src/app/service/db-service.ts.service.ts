import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { MenuDetail } from '../model/menuDetail.model';
@Injectable({
  providedIn: 'root'
})
export class DbServiceTsService {

  constructor(private firebase: AngularFirestore) { }

  deleteDocId(docId: string, collection: string) {

    this.firebase.collection(collection).doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  addData(colName: any, dataArr: unknown) {
    this.firebase.collection(colName).add(dataArr)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  loadDropDownData(collection_name: string) {

    let data: { id: string; name: any; }[] = [];
    let docRef = this.firebase.collection(collection_name).get().toPromise().then(querySnapshot => {


      querySnapshot?.forEach((doc) => {

        data.push({ id: doc.id, name: doc.get('name') });

      });
    });
    
    return data;
  }

  getDetailsByDocId(collection_name:string,menuId:any): Observable<MenuDetail> {
    return this.firebase.collection(collection_name).doc(menuId).get().pipe(map(docSnapshot => {
       const data = JSON.parse(JSON.stringify(docSnapshot.data()));
      
       return data as MenuDetail;
       }));
     }
}
