import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-top-nav',
  templateUrl: './shop-top-nav.component.html',
  styleUrls: ['./shop-top-nav.component.css']
})
export class ShopTopNavComponent implements OnInit {

  openShopNav: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
