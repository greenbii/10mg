import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart_items: any[] = [];

  delivery: string = "express";


  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dt: any = this.route.snapshot.data;

    if(dt.cart) this.cart_items = dt.cart
  }

  getAmount(item: any) {
    return Math.round(item.amount / item.quantity)
  }

  increaseQuantity(i: number) {
    if(this.cart_items[i]) {
      this.cart_items[i].quantity += 1
    }
  }

  decreaseQuantity(i: number) {
    if(this.cart_items[i] && this.cart_items[i].quantity > 1) {
      this.cart_items[i].quantity -= 1
    }
  }

  getSubtotal() {
    let total = 0;
    this.cart_items.forEach(f=>{
      total += f.quantity * f.discount_price
    })

    return total;
  }

  getDeliveryFee() {
    return 0
  }

  

}
