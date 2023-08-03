import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DbServiceTsService } from 'src/app/service/db-service.ts.service';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent  {
  docName!: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,private firebase:AngularFirestore,private dbService:DbServiceTsService,
    @Inject(MAT_DIALOG_DATA) public data:{id:string,name:string,doc:string}
  ) { 
    this.docName=data.doc;
    console.log(data.doc);
  }
 

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteDetails(id:string){
    let doc=this.docName;
    // console.log("Document successfully deleted!"+id);
    // this.firebase.collection("signupDetails").doc(id).delete().then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });
    //this.dbService.deleteDocId(id,'signupDetails');
    console.log("id "+id+" doc "+doc);
    this.dbService.deleteDocId(id,doc);
    }

}
