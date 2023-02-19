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

  business_address: any = null;
  address_delivery: any = null;

  total_weight: number = 0;


  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dt: any = this.route.snapshot.data;



    if(dt.cart) {
      this.cart_items = dt.cart?.items;
      this.business_address = dt.cart?.business_address;
      this.address_delivery = dt.cart?.address_delivery;

      if(this.business_address.state === "lagos") {
        this.delivery = "normal"
      }

      let total_weight = 0;

      this.cart_items.forEach((item: any)=>{
        total_weight = total_weight + (item.brand.packaging.weight * parseFloat(item.quantity))
      })
      this.total_weight = total_weight;
    }
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

  getTotalWeight() {
    let total_weight = 0;

    this.cart_items.forEach((item: any)=>{
      total_weight = total_weight + (item.brand.packaging.weight * parseFloat(item.quantity))
    })

    return Math.round(total_weight)
  }

  getDeliveryFee() {
    //calculate the delivery fee here
    if(this.address_delivery === null) return 0;

    const cur_del = this.address_delivery.find((v: any)=> v.delivery_type === this.delivery);

    if(!cur_del) return 0;

    const total_weight = this.getTotalWeight();
    let amount = 0;

    if(this.business_address.state === "lagos") {
      if(total_weight <= 50) {
        //
        amount = cur_del["zero_to_50"];
      }
      else if(total_weight > 50 && total_weight <= 149) {
        amount = cur_del["51_to_149"];
      }
      else if(total_weight > 149 && total_weight <= 249) {
        amount = cur_del["150_to_249"]
      }
      else if(total_weight > 249 && total_weight <= 500) {
        amount = cur_del["250_to_500"];
      }
      else {
        amount = cur_del["501_to_1500"];
      }

      return amount;
    }
    else {
      //handle for other state here
      //get the total item weight
      if(total_weight <= 30) {
        //
        amount = cur_del["zero_to_30"];
      }
      else if(total_weight > 30 && total_weight <= 50) {
        amount = cur_del["zero_to_30"] + (total_weight - 30) * cur_del["31_to_50"];
      }
      else if(total_weight > 50 && total_weight <= 250) {
        amount = cur_del["zero_to_30"] + (total_weight - 30) * cur_del["51_to_250"];
      }
      else if(total_weight > 251 && total_weight <= 1000) {
        amount = cur_del["zero_to_30"] + (total_weight - 30) * cur_del["251_to_500"];
      }
      else {
        amount = cur_del["zero_to_30"] + (total_weight - 30) * cur_del["1001_to_1500"];
      }

      return amount;
    }
  }

  

}
