import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  product: any = null
  ratings: any[] = [1,2,3,4,5];
  current_address: any = null;
  required_quantity: number = 1;

  is_operation_in_progress: boolean = false;

  constructor(private route: ActivatedRoute, public appService: AppService) { }

  ngOnInit(): void {
    const p: any = this.route.snapshot.data;

    if(p.details) this.product = p.details;

    if(this.appService.current_business_details !== null && this.appService.current_business_details.addresses) {
      this.current_address = this.appService.current_business_details.addresses[0];
    }
  }

  async addToCart() {
    try {
      //add the current item to cart
      if(this.product !== null) {
        this.is_operation_in_progress = true;
        const dt = {
          product_id: this.product.product_id,
          quantity: this.required_quantity
        }
        const token = await this.appService.getCurrentUserToken();
        const response = await this.appService.initiateHttpRequest('post', '/cart', dt, token).toPromise();
        if(response?.status === true) {
          this.appService.loadCustomerCart();
          //navigate to the user's cart page
          this.appService.redirect("/auth/cart");
        }
        else {
          alert(response?.message);
        }
        this.is_operation_in_progress = false;
        //
      }
    }
    catch(e) {
      //show the error message
      this.is_operation_in_progress = false;
      alert(e);
    }
  }

}
