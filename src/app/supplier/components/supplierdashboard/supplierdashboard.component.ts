import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
