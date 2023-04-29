import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  order: any = null;
  order_log : any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dt:any = this.route.snapshot.data;
    
    if(dt.log) {
      this.order = dt.log.order;
      this.order_log = dt.log.log;

      if(this.order_log.length === 0) {
        //add the order placed date
        this.order_log.push({action: 'Order Placed', description: {text: 'Successfully placed order'}, date_created: this.order.date_created})
      }
    }
  }

}
