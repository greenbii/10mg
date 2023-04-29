import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  transactions:  any[] = [];
  allorders: any[] = [];
  orders: any[] = [];
  current_tab = 'pending';
  is_loading: boolean = false;
  selected_order: any = null;

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.loadOrders();

    const dd: any = this.route.snapshot.data;
    if(dd.orders) {
      this.allorders = dd.orders;
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


  switch(user: string) {
    this.orders = this.allorders.filter(f=> (f.status !== null && f.status.toLowerCase() ===  user.toLowerCase()));
  }

  async loadOrders() {
    try {
      const token = 'asdfghjklqwertyuiop';
      this.is_loading = true;
      const rs = await this.appService.initiateHttpRequest('get', '/adm/orders', null, token).toPromise();
      if(rs) {
        if(rs.status === true) {
          this.allorders = rs.data;
          this.switch(this.current_tab)
        }
        else {
          throw rs.message;
        }
      }
      this.is_loading = false;
      
    }
    catch(e: any){
      //alert(e.toString());
      console.log(e);
      this.is_loading = false;
    }
  }

  getTotalOrderTypeCount(type: string) {
    return this.allorders.filter((r:any)=> r.status.toLowerCase() === type.toLowerCase()).length
  }

}
