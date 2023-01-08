import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-product',
  templateUrl: './track-product.component.html',
  styleUrls: ['./track-product.component.css']
})
export class TrackProductComponent implements OnInit {

  statuses = [
    {
      status: 'Order Placed',
      date: '17th November, 2022'
    },
    {
      status: 'Order Approved',
      date: '17th November, 2022'
    },
    {
      status: 'Out for Delivery',
      date: '17th November, 2022'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
