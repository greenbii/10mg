import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

declare var PaystackPop: any;

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

  is_operation_in_progress: boolean = false;


  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dt: any = this.route.snapshot.data;

    



    if(dt.cart) {
      if(!dt.cart.items) return;
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


  openPayStackPop() {

    var handler = PaystackPop.setup({
      //key: "pk_test_ba0a38979fe2a07c6af7f98881d87a0923ca9fd0",
      key: 'pk_test_4def4a4f871bc1e954aa89fae1da4d48909716c4', // Replace with your public key
  
      email: this.appService.current_user.email,
  
      amount: (this.getSubtotal() + this.getDeliveryFee()) * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
  
      currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars

      label: this.appService.current_user.displayName,

      //metadata: {business_id: this.appService.current_business_details.business.id},
  
      //ref: Math.random().toString().split(".")[1], // Replace with a reference you generated
  
      callback: async (response: any)=> {
  
        //this happens after the payment is completed successfully
        this.is_operation_in_progress = true;
  
        var reference = response.reference;

        //this.appService.showNotification("Completing debit/credit card addition, please wait...");
        //this.is_adding_in_progress = true;
  
        //alert('Payment complete! Reference: ' + reference);
        const token = await this.appService.getCurrentUserToken(); //().getIdToken().getJwtToken();
        const resp = await this.appService.initiateHttpRequest('post', '/order' ,{reference: reference}, token).toPromise();
        if(resp?.status === true) {
          //notify the user that the payment method has been added
          //or rather display the payment methods for the user
          //this.payment_methods.push(resp.data);
          alert(resp?.message);
        }
        else {
          //this.appService.showErrorNotification(resp.msg);
          alert(resp?.message)
        }

        //this.is_adding_in_progress = false;
  
        // Make an AJAX call to your server with the reference to verify the transaction
        this.is_operation_in_progress = false;
      },
  
      onClose: ()=> {
  
        alert('Transaction was not completed, window closed.');
  
      },
  
    });
  
    handler.openIframe();
  }

  async proceedCheckout() {
    //proceed to checkout
    const data = {
      items: this.cart_items,
      delivery_address: this.business_address,
      total_weight: this.getTotalWeight(),
      amount: this.getSubtotal(),
      delivery_amount: this.getDeliveryFee(),
      delivery_type: this.delivery
    }

    try {
      this.is_operation_in_progress = true;
      const token = await this.appService.getCurrentUserToken();
      const resposne = await this.appService.initiateHttpRequest('post', '/order', data, token).toPromise();
      if(resposne?.status === true) {
        //navigate to the order page
        this.appService.redirect("/auth/order/"+resposne?.data.order_id)
      }
      else {
        alert(resposne?.message);
      }

      this.is_operation_in_progress = false;
    }
    catch(e){
      console.log(e);
      this.is_operation_in_progress = false;
    }
  }

}
