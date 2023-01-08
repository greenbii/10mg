import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: string = 'B02409'
  title1: string = 'pharmacy details'
  title2: string = 'primary delivery address'
  title3: string = 'account settings'

  constructor() { }

  ngOnInit(): void {
  }

}
