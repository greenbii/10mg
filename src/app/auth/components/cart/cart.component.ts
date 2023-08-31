import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

declare var PaystackPop: any;
declare var Fincra: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart_items: any[] = [];

  states: string[] = [];
  cities: string[] = [];

  delivery: string = "express";

  is_normal_delivery_available: boolean = false;
  is_express_delivery_available: boolean = false;
  is_update_in_progress: boolean = false;

  available_delivery_options: string[] = [];

  business_address: any = null;
  address_delivery: any = null;
  business_addresses: any = null;

  total_weight: number = 0;

  is_operation_in_progress: boolean = false;

  bRegForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required]),
    city: new FormControl(""),
    state: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required])
  })
  is_add_address: boolean = false;

  selected_address: any = null;



  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dt: any = this.route.snapshot.data;

    this.states = this.appService.states.sort((a: any, b:any)=>{
      if(a > b) return 1;
      if(a < b) return -1;

      return 0;
    })



    if(dt.cart) {
      if(!dt.cart.items) return;
      //this.cart_items = dt.cart?.items;
      this.cart_items = this.appService.current_customer_cart.items;
      const default_biz_address = dt.cart?.business_address.find((ff:any)=> ff.is_default === 1);
      this.business_address = default_biz_address ? default_biz_address : dt.cart?.business_address[0];
      this.address_delivery = dt.cart?.address_delivery;
      this.business_addresses = dt.cart?.business_address;

      this.selected_address = this.business_address?.id.toString()


      if(this.business_address) {

        if(this.business_address.state === "lagos") {
          this.delivery = "normal"
          this.is_normal_delivery_available = true;
        }
        else {
          if(this.address_delivery.length > 1) {
            this.is_express_delivery_available = true;
            this.is_normal_delivery_available = true;
          }
          else {
            this.is_normal_delivery_available = true;
            this.delivery = "normal"
          }
        }
      }

      let total_weight = 0;

      this.cart_items.forEach((item: any)=>{
        total_weight = total_weight + (item.brand.packaging.weight * parseFloat(item.quantity))
      })
      this.total_weight = total_weight;
    }
  }

  async removeAddress(address: any) {
    if(!confirm("Are you sure you want to remove this address?")) return;
    
    try {
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('delete', '/address/'+address.id, undefined, token).toPromise();
      if(rs?.status === true) {
        //remove the address from list
        const tIndex = this.business_addresses.findIndex((ff: any)=> ff.id === address.id);
        if(tIndex !== -1) {
          this.business_addresses.splice(tIndex, 1);
        }
      }
      else {
        alert(rs?.message);
      }
    }
    catch(ee) {
      console.log(ee);
    }
    
  }

  changeAddress(address: any) {
    this.business_address = address;
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
      const tt = f.actual_price + f.tenmg_amount;
      total += f.quantity * tt; //f.discount_price; //(tt + f.tenmg_amount)
    })

    return total;
  }

  getTotalWeight() {
    let total_weight = 0;

    

    this.cart_items.forEach((item: any)=>{
      //console.log(item.brand.packaging.weight);
      total_weight = total_weight + (item.brand.packaging.weight * parseFloat(item.quantity))
    })

    return Math.round(total_weight)
  }

  getDeliveryFee() {
    //calculate the delivery fee here
    
    if(!this.address_delivery || this.address_delivery === null) return 0;

    if(this.selected_address === null) return 0;

    //get the current delivery address
    const address_id = parseInt(""+this.selected_address);
    const address_index = this.business_addresses.findIndex((ff:any)=> ff.id === address_id);
    
    if(address_index === -1) return 0;




    const cur_del = this.address_delivery[address_index].find((v: any)=> v.delivery_type === this.delivery);
    
    if(!cur_del) return 0;

    const total_weight = parseFloat(""+this.getTotalWeight());
    let amount = 0;

    if(this.business_address.state.toLowerCase() === "lagos") {
      if(total_weight <= 50) {
        //
        amount = cur_del["zero_to_50"];
      }
      else if(total_weight > 50 && total_weight <= 149) {
        amount = cur_del["51_to_149"];
      }
      else if(total_weight > 149 && total_weight <= 249) {
        amount = cur_del["151_to_249"]
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
      console.log("Address is not in Lagos")
      if(cur_del["zero_to_50"]) {
        if(total_weight <= 50) {
          //
          amount = cur_del["zero_to_50"] * total_weight;
        }
        else if(total_weight > 50 && total_weight <= 150) {
          amount = cur_del["51_to_149"] * total_weight;
        }
        else if(total_weight > 149 && total_weight <= 249) {
          amount = cur_del["150_to_249"] * total_weight
        }
        else if(total_weight > 249 && total_weight <= 500) {
          amount = cur_del["250_to_500"] * total_weight;
        }
        else {
          amount = cur_del["501_to_1500"] * total_weight;
        }
      }
      else {
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
      }
      //handle for other state here
      //get the total item weight

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
        this.appService.current_customer_cart = null;
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


  async removeCartItem(item_id: any) {
    //remove item from cart
    try {
      if(!confirm("Are you sure you want to remove this item from cart?")) return;

      const token = await this.appService.getCurrentUserToken();
      const resp = await this.appService.initiateHttpRequest('delete', '/cart/'+item_id, undefined, token).toPromise();
      if(resp?.status === true) {
        const it = this.appService.current_customer_cart?.items?.findIndex((ff:any)=> ff.cart_id === item_id)
        if(it !== -1) {
          this.appService.current_customer_cart.items.splice(it, 1);
          if(this.appService.current_customer_cart.items.length === 0) {
            this.appService.current_customer_cart = null;
          }
        }
      }
      else {
        throw resp?.message;
      }
    }
    catch(e: any) {
      alert(e.toString());
    }
  }

  async loadStateCities() {
    try {
    //load the available cities for the selected state
      if(this.bRegForm.value.state !== null && this.bRegForm.value.state.trim() !== "") {
        //load the cities available for this state
        const rs = await this.appService.initiateHttpRequest("get", "/available-cities/"+this.bRegForm.value.state).toPromise();
        if(rs?.status === true) {
          this.cities = [];
          this.bRegForm.patchValue({city: ""});
          this.cities = rs.data.map((d: any)=> d.destination_area)
        }
      }
    }
    catch(e){
      console.log(e);
    }
  }

  async addAddress() {
    try {
      this.is_update_in_progress = true;
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('post', '/address', {...this.bRegForm.value}, token).toPromise();
      this.is_update_in_progress = false;
      if(rs?.status === true) {
        this.selected_address = rs.data?.id.toString();
        this.business_address = rs.data;
        //document.getElementById("close-address-modal")?.click();
      }
      else {
        throw rs?.message;
      }
      
    }
    catch(er: any) {
      this.is_update_in_progress = false;
      alert(er.toString())
    }
  
  }

}
