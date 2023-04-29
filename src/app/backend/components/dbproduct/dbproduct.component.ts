import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dbproduct',
  templateUrl: './dbproduct.component.html',
  styleUrls: ['./dbproduct.component.css']
})
export class DbproductComponent implements OnInit {

  productCards: any = [
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
  

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productCards = [];

    const d:any = this.route.snapshot.data;
    if(d.pd) {
      this.productCards = d.pd;
    }
  }

}
