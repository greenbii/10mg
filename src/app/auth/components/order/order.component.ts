import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
declare var PaystackPop: any;
declare var FlutterwaveCheckout: any;
declare var Fincra: any;

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

  is_paid_order: boolean = false;


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

      ref: this.order.order_id,

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
        const resp = await this.appService.initiateHttpRequest('get', '/order/complete/'+reference, undefined, token).toPromise();
        if(resp?.status === true) {
          //notify the user that the payment method has been added
          //or rather display the payment methods for the user
          //this.payment_methods.push(resp.data);
          this.is_paid_order = true;
          alert(resp?.message);
          location.reload();
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
        console.log("Transaction was not completed, window closed!");
        //alert('Transaction was not completed, window closed.');
  
      },
  
    });
  
    handler.openIframe();
  }

  openFlutterwavePG() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-364c5c6755a70ea7e4f5c3661164fc7f-X",
      tx_ref: this.order.order_id,
      amount: (this.order.order_total + this.order.logistics_total),
      currency: "NGN",
      //payment_options: "card, mobilemoneyghana, ussd",
      //redirect_url: document.location.toString(), //"https://glaciers.titanic.com/handle-flutterwave-payment",
      /*meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a",
      },*/
      customer: {
        email: this.appService.current_user.email, //"rose@unsinkableship.com",
        //phone_number: "08102909304",
        name: this.appService.current_user.displayName //"Rose DeWitt Bukater",
      },
      customizations: {
        title: "10mg Pharma",
        description: "Payment for Product"
        //logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
      },
      callback: async (response: any)=> {
        console.log(response);
  
        //this happens after the payment is completed successfully
        this.is_operation_in_progress = true;
  
        var reference = response.tx_ref;
        var t_id = response.transaction_id;

        //this.appService.showNotification("Completing debit/credit card addition, please wait...");
        //this.is_adding_in_progress = true;
  
        //alert('Payment complete! Reference: ' + reference);
        const token = await this.appService.getCurrentUserToken(); //().getIdToken().getJwtToken();
        const resp = await this.appService.initiateHttpRequest('post', '/order/complete/'+t_id, {reference: reference}, token).toPromise();
        if(resp?.status === true) {
          //notify the user that the payment method has been added
          //or rather display the payment methods for the user
          //this.payment_methods.push(resp.data);
          this.is_paid_order = true;
          alert(resp?.message);
          location.reload();
        }
        else {
          //this.appService.showErrorNotification(resp.msg);
          alert(resp?.message)
        }

        //this.is_adding_in_progress = false;
  
        // Make an AJAX call to your server with the reference to verify the transaction
        this.is_operation_in_progress = false;
      }
    });
  }

  openFincraPopUp() {
    let nme = this.appService.current_user.displayName.toString().trim().split(" ");
    let uname = nme[0].trim()+" "+(nme[1] && nme[1].toString().trim().length !== 0 ? nme[1].toString().trim() : nme[0])
    Fincra.initialize({
      key: environment.fincra_key,
      amount: (this.order.order_total + this.order.logistics_total),
      currency: "NGN",
      customer: {
          name: uname, //this.appService.current_user.displayName,
          email: this.appService.current_user.email
          //phoneNumber: document.getElementById("phoneNumber").value,
        },
     //Kindly chose the bearer of the fees
     feeBearer: "customer",

     metadata: {
        order_id: this.order.order_id,
        customer_id: this.appService.current_user.uid
     },

      onClose: ()=> {
        alert("Transaction was not completed, window closed.");
      },
      onSuccess: async (data: any)=> {
        const reference = data.reference;
        //console.log(data);
        //alert("Payment complete! Reference: " + reference);
        //this happens after the payment is completed successfully
        //this.is_operation_in_progress = true;
        this.is_paid_order = true;
        //console.log(this.order);

        alert("Payment received, we are proceesing your payment, you will be notitied when payment is confirmed, Click OK to proceed")

        this.appService.redirect("/auth/shop");
        /*const token = await this.appService.getCurrentUserToken();
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
        }*/

        //this.is_adding_in_progress = false;
  
        // Make an AJAX call to your server with the reference to verify the transaction
        //this.is_operation_in_progress = false;
      },
    });
  }



}
