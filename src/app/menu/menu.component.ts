import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

interface items {
  name: string;
  size: string;
  flavor: string;
  sweetner: string;
  dairy:string;
}
// export interface Course {
//   id:number;
//   description:string;
//   iconUrl: string;
//   courseListIcon: string;
//   longDescription: string;
//   category:string;
//   lessonsCount:number;
// }
export class MenuComponent implements items {
  name!: string;
  size!: string ;
  flavor!: string;
  sweetner!: string;
  dairy!: string;

}
