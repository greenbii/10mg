import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountstatus',
  templateUrl: './accountstatus.component.html',
  styleUrls: ['./accountstatus.component.css']
})
export class AccountstatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  account_status = {
    status: "normal",
    rating: 5,
    cancellation_rate: 0,
    shipment_performance: "Good"
  }

}
