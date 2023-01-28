import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  incomeIcon = 'fa-solid fa-money-bill';
  analyticsIcon = 'fa-solid fa-chart-simple';
  orderIcon = 'fa-solid fa-receipt';

  recentOrders = [
    {
      product: 'Pentazocine',
      quantity: 20,
      status: 'Completed',
      price: 234
    },
    {
      product: 'Emzol',
      quantity: 9,
      status: 'Completed',
      price: 112
    },
    {
      product: 'Tetracycline',
      quantity: 40,
      status: 'Completed',
      price: 462
    },
    {
      product: 'Flagyl',
      quantity: 10,
      status: 'Completed',
      price: 234
    }
  ]

  recentTransactions = [
    {
      date: 'Feb 20, 2022',
      product: 'Emzole',
      price: 234
    },
    {
      date: 'Mar 27, 2023',
      product: 'Flagyl',
      price: 112
    },
    {
      date: 'Jan 2, 2023',
      product: 'Tetracycline',
      price: 462
    },
    {
      date: 'Jan 9, 2022',
      product: 'Pentazocine',
      price: 234
    }
  ]

  userCards = [
    {
      icon: this.incomeIcon,
      title: 'Income',
      cost: 1250150,
    },
    {
      icon: this.analyticsIcon,
      title: 'Quantity Sold',
      cost: 1250,
    },
    {
      icon: this.orderIcon,
      title: 'Orders',
      cost: 1450,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.createChart();
    this.createYearChart();
  }

  current_tab: string = 'monthChart'

  public chart: any;
  public yearChart: any;

  income: any = 180000;

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Income',
            data: [200, 190, 150, 120, 170, 80, 120, 50, 150, 150, 200, 0],
            backgroundColor: 'blue',
            tension: 0.3,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  createYearChart() {
    this.yearChart = new Chart('MyYearChart', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
        datasets: [
          {
            label: 'Income',
            data: [
              200, 190, 150, 120, 170, 80, 120, 50, 150, 150, 200, 0, 190, 150,
              150, 150, 120, 110, 50, 120, 200, 100, 90, 10, 0, 100, 30, 100, 90, 150
            ],
            backgroundColor: '#00cccc',
            tension: 0.3,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
