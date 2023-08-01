import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../model/menu_items.model';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{

  constructor(private responsive :BreakpointObserver){}
  rowHeight='500px';
  cols=5;
  handsetPotrait=false;
 menu: MenuItems[]=[{
  name:'Iced Coffee',
  description:'It is good',
  imgUrl:'https://cdn.pickuplimes.com/cache/0e/3a/0e3a9431b6af2aff54e97e573f58476c.jpg'
 },
{ name:'Cold Brew',
 description:'It is good',
 imgUrl:'https://basicswithbails.com/wp-content/uploads/2023/06/iced-latte-540x720.jpg'
},
{ name:'Cold Brew',
 description:'It is good',
 imgUrl:'https://basicswithbails.com/wp-content/uploads/2023/06/iced-latte-540x720.jpg'
},
{ name:'Cold Brew',
 description:'It is good',
 imgUrl:'https://basicswithbails.com/wp-content/uploads/2023/06/iced-latte-540x720.jpg'
},
{ name:'Cold Brew',
 description:'It is good',
 imgUrl:'https://basicswithbails.com/wp-content/uploads/2023/06/iced-latte-540x720.jpg'
},
{ name:'Cold Brew',
 description:'It is good',
 imgUrl:'https://basicswithbails.com/wp-content/uploads/2023/06/iced-latte-540x720.jpg'
},
{ name:'Cold Brew',
 description:'It is good',
 imgUrl:'https://basicswithbails.com/wp-content/uploads/2023/06/iced-latte-540x720.jpg'
},
{ name:'Cold Brew',
 description:'It is good',
 imgUrl:'https://basicswithbails.com/wp-content/uploads/2023/06/iced-latte-540x720.jpg'
}
];

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
