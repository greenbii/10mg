import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  allorders: any[] = [];
  orders: any[] = [];
  selected_order: any = null;


  current_tab: string = 'pending'

  constructor(private appService: AppService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const d: any = this.route.snapshot.data;
    if(d.orders) {
      //console.log(d.dt);
      this.allorders = d.orders;
      this.getOrders(this.current_tab);
    }

    this.route.queryParamMap.subscribe(p=>{
      if(p.has("order") || p.get("order") !== null) {
        //check if the order exists in the available orders
        if(this.allorders.length !== 0) {
          const or = this.allorders.find(order=> order.order_id === p.get("order")?.trim());
          if(or) {this.selected_order = or; return; }
        }
      }
      this.selected_order = null;
    })
  }

  getOrders(type: string) {
    if(!Array.isArray(this.allorders) || this.allorders.length === 0 ) return;
    if(type.toLowerCase().trim() === "paid") {
      this.orders = this.allorders.filter(order=> order.status.toLowerCase() === "paid" || order.status.toLowerCase() === "unshipped" || order.status.toLowerCase() === "shipped");
    }
    else {
      this.orders = this.allorders.filter(order=> order.status.toLowerCase() === type.toLowerCase());
    }
  }

  getTotalOrderTypeCount(type: string) {
    if(!Array.isArray(this.allorders) || this.allorders.length === 0 ) return;
    //return this.allorders.filter((r:any)=> r.status.toLowerCase() === type.toLowerCase()).length
    if(type.toLowerCase().trim() === "paid") {
      return this.allorders.filter(order=> order.status.toLowerCase() === "paid" || order.status.toLowerCase() === "unshipped" || order.status.toLowerCase() === "shipped").length;
    }
    else {
      return this.allorders.filter(order=> order.status.toLowerCase() === type.toLowerCase()).length;
    }
  }
}
