import {Component, OnInit} from '@angular/core';
import {User} from "../types";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: User[];

  constructor() {
    this.users = [
      {id: 1, fullName: "John Doe", birthday: new Date("05.12.1980")},
      {id: 2, fullName: "Jane Doe", birthday: new Date("12.01.1980")},
      {id: 3, fullName: "Jim Doe", birthday: new Date("08.04.1980")},
      {id: 4, fullName: "Jenny Doe", birthday: new Date("11.25.1980")},
    ];
  }

  ngOnInit(): void {
  }

}
