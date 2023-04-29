import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplierdashboard',
  templateUrl: './supplierdashboard.component.html',
  styleUrls: ['./supplierdashboard.component.css']
})
export class SupplierdashboardComponent implements OnInit {
  supplier = {
    income: 0,
    quantity_sold: 0,
    orders: 0
  }

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

  account_details: any = null;
  user_details: any = null;

  ngOnInit(): void {
    const dt : any = this.route.snapshot.data;
    //console.log(dt);
    if(dt.details) {
      this.account_details = dt.details.business
      this.user_details = dt.details.u;
    }

    if(this.account_details.wallet_balance) this.supplier.income = this.account_details.wallet_balance;
  }

}
