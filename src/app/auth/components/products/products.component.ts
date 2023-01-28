import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /*products = [
    {
      id: 1,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 2,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 3,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 4,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 5,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 6,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 7,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 8,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 9,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
    {
      id: 10,
      productPercentage: '-30%',
      name: 'Pentazocine',
      price: 700,
      oldPrice: 1700,
    },
  ]*/

  products: any[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    const rt: any = this.route.snapshot.data;

    if(rt.products) {
      this.products = rt.products
    }
  }

  getPercentage(product: any) {
    return Math.round((product.actual_price - product.discount_price) / 100)
  }

}
