import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection } from '@angular/fire/firestore';
import firebase from 'firebase/compat';
import { Observable, map } from 'rxjs';
import { AuthGuard } from '../auth-guard.service';
import { CustomData } from '../model/customData.model';
import { MenuDetail } from '../model/menuDetail.model';
@Injectable({
  providedIn: 'root'
})
export class DbServiceTsService {

  constructor(private firebase: AngularFirestore, private authService: AuthGuard) { }

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

  updateDoc(collection_name: string, id: string, data: any) {
    // console.log("coll name "+collection_name+" id "+id+" data "+data);
    // let doc = this.firebase.collection(collection_name, ref => ref.where('id', '==', id));
    // doc.snapshotChanges().subscribe((res: any) => { console.log("update data ",res);
    //   let id = res[0].payload.doc.id;
    //   this.firebase.collection(collection_name).doc(id).update(data);
    // });

    this.firebase
      .collection(collection_name)
      .doc(id)
      .update(data)
      .then(() => {
        console.log('done');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  add_SubCollection(collectionName: any, docId: any, subCollectionName: any, dataArr: firebase.firestore.DocumentData, activity: string) {
    this.firebase.collection(collectionName).doc(docId).collection(subCollectionName).add(dataArr).then((docRef) => {

      if (activity == "logging") {
        this.authService.log_subColl_id.next(docRef.id);

      }

      console.log("Document written with ID: ", docRef.id);

    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }




  updateDataInSubcollection(parentCollection: string, parentDocId: string, subcollectionName: string, documentId: string, updatedData: any) {
    const subcollectionRef = this.firebase
      .collection(parentCollection)
      .doc(parentDocId)
      .collection(subcollectionName)
      .doc(documentId);

    return subcollectionRef.update(updatedData);
  }

  loadDropDownData(collection_name: string) {
    console.log(collection_name);
    let data: { id: string; name: any; }[] = [];
    let docRef = this.firebase.collection(collection_name).get().toPromise().then(querySnapshot => {


      querySnapshot?.forEach((doc) => {

        data.push({ id: doc.id, name: doc.get('name') });

      });
    });
    console.log(data);
    return data;
  }

  getDetailsByDocId(collection_name: string, menuId: any): Observable<MenuDetail> {

    return this.firebase.collection(collection_name).doc(menuId).get().pipe(map(docSnapshot => {
      const data = JSON.parse(JSON.stringify(docSnapshot.data()));

      return data as MenuDetail;
    }));


  }
  getCustomDetailsByDocId(collection_name: string, menuId: any): Observable<CustomData> {

    return this.firebase.collection(collection_name).doc(menuId).get().pipe(map(docSnapshot => {
      const data = JSON.parse(JSON.stringify(docSnapshot.data()));

      return data as CustomData;
    }));


  }
  addDataCustomDoc(colName: any, docName: any, dataArr: unknown) {
    this.firebase.collection(colName).doc(docName).set(dataArr)
      .then(() => {
        console.log("Added Successfully");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}
function take(arg0: number): import("rxjs").OperatorFunction<firebase.firestore.DocumentData[], unknown> {
  throw new Error('Function not implemented.');
}

