import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  supplier = {
    income: 0,
    quantity_sold: 0,
    orders: 0,
    expiring_licences: 0
  }

  orders = {
    total_orders: 0,
    shipped: 0,
    unshipped: 0
  }

  summary: any = null;

  type = 'line';
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "App Installations",
        data: [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0],
        borderColor: 'rgb(75, 192, 192)'
      },
      {
        label: "Monthly Revenue",
        data: [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0]       
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dt: any = this.route.snapshot.data;

    if(dt.summary) {
      this.summary = dt.summary;

      //get total orders 
      this.orders.total_orders = this.summary.total_orders.length;

      this.orders.shipped = this.summary.total_orders.filter((f:any)=> f.status.toLowerCase() === "unshipped" || f.status.toLowerCase() === "paid").length;

      this.orders.shipped = this.summary.total_orders.filter((f: any)=> f.status.toLowerCase() === "shipped").length;

    }
  }

}
