import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../model/menu_items.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{

  constructor(private responsive :BreakpointObserver,private firebase:AngularFirestore){}
  rowHeight='500px';
  cols=5;
  handsetPotrait=false;

  menu: { id: string; name: string; imgUrl: any; }[]=[];


docRef = this.firebase.collection('coffee').get().toPromise().then(querySnapshot => {
    let details: { id: string; name: string; imgUrl: any; }[]=[];
    
    querySnapshot?.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        details.push({id:doc.id,name:doc.get('name'),imgUrl:doc.get('image')});
      
       
    });
    
    this.menu=details;
  });

ngOnInit() {
  console.log("width : "+window.innerWidth);
  this.responsive.observe([
    Breakpoints.TabletLandscape,
    Breakpoints.TabletPortrait,
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait
]).subscribe(result => {

    this.cols=5;
    this.rowHeight="500px";
    this.handsetPotrait=false;

    const breakpoints=result.breakpoints;
    if(breakpoints[Breakpoints.TabletPortrait]){
        this.cols=1;
    } else if(breakpoints[Breakpoints.HandsetPortrait]){
        this.cols=1;
        this.rowHeight="430px";
        this.handsetPotrait=true;

    } else if(breakpoints[Breakpoints.HandsetLandscape]){
        this.cols=2;

    } else if(breakpoints[Breakpoints.TabletLandscape]){

        this.cols=2;
    }
});
}

}
