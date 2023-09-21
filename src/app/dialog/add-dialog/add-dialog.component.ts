import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbServiceTsService } from 'src/app/service/db-service.ts.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  docName!: string;
  id!:string;
  action!:string
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,private firebase:AngularFirestore,
    private dbService:DbServiceTsService,private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:{id:string,action:string,collection_name:string}
  ) { 
    this.docName=data.collection_name;
    this.id=data.id;
    this.action=data.action;
    console.log(data.collection_name);
  }
 
  form:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    active:['']
   
  });
  onNoClick(): void {
    this.dialogRef.close();
  }

  addDetails(){
    let doc=this.docName;
    let itemData={
      name:this.form.value['name'],
      active:this.form.value['active']
    }
   
    this.dbService.addData(doc,itemData);
    this.dialogRef.close();
   // console.log("id "+id+" doc "+doc);
   // this.dbService.deleteDocId(id,doc);
    }
}
