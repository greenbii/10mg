import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dbproduct',
  templateUrl: './dbproduct.component.html',
  styleUrls: ['./dbproduct.component.css']
})
export class DbproductComponent implements OnInit {

  productCards = [
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
