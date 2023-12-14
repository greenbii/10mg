import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  headings = [
    {key: "loan", label: "Loans"},
    {key: "revenue", label: "Revenues"},
    {key: "order", label: "Orders"},
    {key: "healthcare", label: "Healthcare Providers"}
  ]

  selected_filter_item: string = 'revenue';
  selected_filter_period: string = 'monthly';

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

  type = 'bar';
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      // {
      //   label: "App Installations",
      //   data: [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0],
      //   borderColor: 'rgb(75, 192, 192)'
      // },
      {
        label: "Revenue",
        data: [50000, 100000, 20000, 115000, 27890, 56721, 67900, 121234, 67890,43215,678543,22000]   ,
        borderColor: 'rgb(0, 0, 255)',
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(201, 203, 207, 0.2)'
        ],
        minBarLength: 20,
        borderWidth: 2
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  constructor(private route: ActivatedRoute, private appService: AppService) { }

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

  async smart() {
    try {
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('get', '/admin', undefined, token).toPromise();
      console.log(rs);
    }
    catch(e) {
      console.log(e);
    }
  }

}
