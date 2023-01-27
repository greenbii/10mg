import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-db-side-nav',
  templateUrl: './db-side-nav.component.html',
  styleUrls: ['./db-side-nav.component.css']
})
export class DbSideNavComponent implements OnInit {

  openSideNav: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
