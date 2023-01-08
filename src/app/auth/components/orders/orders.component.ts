import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = [
    {
      id: 1,
      productName: 'Pentazocine',
      size: "200Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 700,
      oldPrice: 1700,
    },
    {
      id: 2,
      productName: 'Paracetamol',
      size: "500Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 700,
      oldPrice: 1700,
    },
    {
      id: 3,
      productName: 'Flagyl',
      size: "200Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 900,
      oldPrice: 2000,
    },
  ];

  ordersCompleted = [
    {
      id: 1,
      productName: 'Tetracycline',
      size: "500Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 700,
      oldPrice: 1700,
    },
    {
      id: 2,
      productName: 'Chloroquine',
      size: "100Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 700,
      oldPrice: 1700,
    },
    {
      id: 3,
      productName: 'Amalah',
      size: "200Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 900,
      oldPrice: 2000,
    },
  ];

  ordersCancelled = [
    {
      id: 1,
      productName: 'Blood Tonic',
      size: "200Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 700,
      oldPrice: 1700,
    },
    {
      id: 2,
      productName: 'Flagyl',
      size: "500Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 700,
      oldPrice: 1700,
    },
    {
      id: 3,
      productName: 'Vitamin C',
      size: "200Mg",
      brand: "Emzol",
      deliveryDate: "25th Dec, 2025",
      currentPrice: 900,
      oldPrice: 2000,
    },
  ];

  current_tab: string = 'pending'

  constructor() {}

  ngOnInit(): void {}
}
