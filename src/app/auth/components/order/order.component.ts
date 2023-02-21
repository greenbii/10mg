import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
declare var PaystackPop: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cart_items: any[] = [];

  delivery: string = "express";

  business_address: any = null;
  address_delivery: any = null;

  total_weight: number = 0;

  is_operation_in_progress: boolean = false;

  order: any = null;


  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const dt: any = this.route.snapshot.data;

  

    if(dt.dt) {
      this.cart_items = dt.dt?.order_details;
      this.order = dt.dt;
      //this.business_address = dt.cart?.business_address;
      //this.address_delivery = dt.cart?.address_delivery;
    }
  }


  









  openPayStackPop() {

    var handler = PaystackPop.setup({
      //key: "pk_test_ba0a38979fe2a07c6af7f98881d87a0923ca9fd0",
      key: 'pk_test_4def4a4f871bc1e954aa89fae1da4d48909716c4', // Replace with your public key
  
      email: this.appService.current_user.email,
  
      amount: (this.order.order_total + this.order.logistics_total) * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
  
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



}
