import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-status-cancelled',
  templateUrl: './product-status-cancelled.component.html',
  styleUrls: ['./product-status-cancelled.component.css']
})
export class ProductStatusCancelledComponent implements OnInit {

  details = [
    {
      title: 'Delivery date',
      info: 'Between 14th and 17th November'
    },
    {
      title: 'Order ID',
      info: '#9341373777'
    },
    {
      title: 'Brand',
      info: 'Emzor'
    },
    {
      title: 'Logistic',
      info: '10mg'
    },
    {
      title: 'Carrier name',
      info: 'John'
    },
    {
      title: 'Product weight',
      info: '20Kg'
    },
    {
      title: 'Delivery location',
      info: '2 Oduyebo Ikorodu Odogunyan, Ikorodu, Lagos, Nigeria.'
    },
    {
      title: 'Product cost',
      info: 900
    },
    {
      title: 'Tracking ID',
      info: 'John'
    },
    {
      title: 'Carrier name',
      info: '#9341373777'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
