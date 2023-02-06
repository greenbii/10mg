import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  drugs: any[] = []

  product: any = {
    name: null,
    brand: null,
    package_per_roll: null,
    weight: null,
    presentation: null,
    strength: null,
    quantity: null,
    discount_price: null,
    actual_price: null,
    description: null
  }

  product_details: any = {
    variations: [],
    packaging: []
  }

  selectedDrug: any = null;
  selectedWeight: any = null;
  selectedPackage: any = null;
  selectedStrength: any = null;
  selectedBrand: any = null;




  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  async loadDrugDetails() {
    try {
      if(this.product.name !== null && this.product.name.trim() !== "") {
        //load the details of the selected drug
        const token = await this.appService.getCurrentUserToken();
        const response = await this.appService.initiateHttpRequest('get', '/drugs/'+this.product.name, undefined, token).toPromise();
        if(response?.status === true) {
          //load the details here

        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }

}
