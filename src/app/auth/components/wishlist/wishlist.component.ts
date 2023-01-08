import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlists = [
    {
      name: 'Pentazocine',
      size: '200Mg',
      brand: 'Mayo Clinic',
      date: '01 January, 2010',
      currentpPice: 700,
      oldPrice: 1700,

    },
    {
      name: 'Chloroquine',
      size: '200Mg',
      brand: 'Mayo Clinic',
      date: '01 January, 2010',
      currentpPice: 700,
      oldPrice: 1700,

    },
    {
      name: 'Paracetamol',
      size: '200Mg',
      brand: 'Mayo Clinic',
      date: '01 January, 2010',
      currentpPice: 700,
      oldPrice: 1700,

    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
