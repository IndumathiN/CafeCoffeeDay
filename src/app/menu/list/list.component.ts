import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {

  constructor(private firebase:AngularFirestore,private router: Router,public dialog: MatDialog) { }
  displayedColumns: string[] = ['sno', 'name', 'calories','edit'];
  dataSource: { id: string; name: string; calories: any; }[]=[];
  
  tabs = ['Coffee', 'Tea'];
 // @ViewChild('tabGroup') tabGroup: any;
  @ViewChild('tabGroup')
  private tabGroup!: MatTabGroup;
  docName!: string;

  ngAfterViewInit() {
    let tabName=this.tabGroup._tabs.first.textLabel;
    let doc_name=tabName.toLowerCase();
    this.loadData(doc_name);
    this.docName=doc_name;
  }

  loadData(doc_name:string){
   let docRef = this.firebase.collection(doc_name).get().toPromise().then(querySnapshot => {
      let details: { sno:number;id: string; name: string; calories: any; }[]=[];
      let sno=1;
      querySnapshot?.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          details.push({sno:sno,id:doc.id,name:doc.get('name'),calories:doc.get('calories')});
          sno++;
         
      });
      
      this.dataSource=details;
    });
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
   
    let tabname=tabChangeEvent.tab.textLabel;
    let doc_name=tabname.toLowerCase();
    this.docName=doc_name;
    this.loadData(doc_name);


  }

  openDialog(id:string,name:string): void {
    const tab=this.docName;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, name: name, doc:tab},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
