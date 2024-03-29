import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  drugs: any[] = [];

  drugs_strength_value: number[] = [
    0.5, 1, 1.5, 2, 2.5, 5, 10, 20, 30, 40, 50, 100, 200
  ]

  drug_details: any = {
    weights: [],
    brands: [],
    strengths: [],
    packagings: []
  }

  product: any = {
    name: null,
    brand: null,
    package_per_roll: null,
    weight: null,
    presentation: null,
    strength: null,
    strength_value: null,
    description: null,
  }

  current_user_id: string = "";

  is_operation_in_progress: boolean = false;
  is_uploading: boolean = false;

  product_details: any = {
    variations: [],
    packaging: []
  }

  selectedDrug: any = null;
  selectedWeight: any = null;
  selectedPackage: any = null;
  selectedStrength: any = null;
  selectedBrand: any = null;

  uploadFiles: File[] = [];




  constructor(private appService: AppService, private fStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.current_user_id = this.appService.current_user.uid;

    this.loadDrugs();
  }

  checkAllowDrugEditing() {
    return true;
    //if(this.selectedDrug === null) return false;
    //return this.selectedDrug !== null && this.selectedDrug['__isNew__'] || (this.selectedDrug['added_by'] && this.selectedDrug['added_by'] === this.current_user_id)
  }

  isFormValid() {

    if(this.selectedWeight === null || 
      this.selectedDrug === null || 
      this.selectedPackage === null
      || this.product.strength_value === null
      || this.product.strength === null
      || this.product.presentation === null
      || this.selectedBrand === null) return false;

    return true;
  }

  handleDrugSelection($event: any) {
    //console.log($event);
    //load the details of the drug that was selected
    this.product.name = $event.label;
    if(!$event["__isNew__"]) {
      //it means its not a new drug
      //load the previous details of the drug
      this.loadDrugDetails();
    }


  }

  handleWeightSelection($event: any) {
    this.product.weight = $event.label
  }

  handleStrengthSelection($event: any) {
    this.product.strength = $event.label;
  }

  handlePackagingSelection($event: any) {
    this.product.package_per_roll = $event.label;
  }

  handleBrandSelection($event: any) {
    this.product.brand = $event.label;
  }

  getFile($event: any) {
    if($event.target.files.length !== 0) {
      const fl = $event.target.files[0] as File;
      this.uploadFiles.push(fl);
    }
  }


  async loadDrugDetails() {
    try {
      if(this.product.name !== null && this.product.name.trim() !== "") {
        //load the details of the selected drug
        const token = await this.appService.getCurrentUserToken();
        const response = await this.appService.initiateHttpRequest('get', '/drugs/'+this.product.name, undefined, token).toPromise();
        if(response?.status === true) {
          //load the details here
          //console.log(response);
          if(response.data.brands && response.data.brands.length !== 0) {
            //list all the brands for this product
            this.drug_details.brands = response.data.brands.map((b: any)=>{
              return {...b, label: b.name.toUpperCase(), value: b.brand_id}
            });
          }

          //get the available strengths for this drug
          if(response.data.variations && response.data.variations.length !== 0) {
            this.product_details.variations = response.data.variations;
            this.drug_details.strengths = response.data.variations.map((b: any)=>{
              return {...b, label: b.strength, value: b.id}
            });
          }

          if(response.data.packaging && response.data.packaging.length !== 0) {
            this.product_details.packaging = response.data.packaging;
            this.drug_details.weights  = response.data.packaging.map((b: any)=>{
              return {...b, label: b.weight, value: b.package_id}
            });

            this.drug_details.packagings = response.data.packaging.map((b: any)=>{
              return {...b, label: b.package_per_roll, value: b.package_id}
            });
          }
        }
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  async addProduct() {
    try {
      this.is_operation_in_progress = true;

      //handle the remaining aspect of the registration
      const token = await this.appService.getCurrentUserToken()
      const response = await this.appService.initiateHttpRequest("post", "/medications", this.product, token).toPromise();
      if(response?.status === true) {
        //inform the user that the operation was successful
        alert(response.message);
        this.resetForm();
      }
      else {
        alert(response?.message);
      }

      this.is_operation_in_progress = false;

    }
    catch(e) {
      alert(e);
      this.is_operation_in_progress = false;
    }
  }



  async loadDrugs() {
    try {
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest("get", "/drugs", undefined, token).toPromise();
      if(rs?.status === true) {
        this.drugs = rs.data.map((m: any)=>{
          return {...m, label: m.name.toUpperCase(), value: m.drug_id}
        })
      }
      else {
        console.log(rs?.message);
      }
      
    }catch(er){
      console.log(er);
    }
  }

  loadDrugDescription() {
    
    if(this.product.strength !== null && this.product.presentation !== null) {
      console.log(this.product.strength, this.product.presentation);
      //this.selectedStrength = this.product.strength
      //load the description
      if(this.product_details.variations.length !== 0) {
        const desc = this.product_details.variations.find((f:any)=> {
          return f.presentation === this.product.presentation && f.strength === this.product.strength && this.product.strength_value === f.strength_value
        });


        //this.product.description = this.product_details.variations[0].description;

        if(desc) {
          this.product.description = desc.description;
        }
        else {
          this.product.description = null;
        }
      }
    }
  }

  resetForm() {
    this.product = {
      name: null,
      brand: null,
      package_per_roll: null,
      weight: null,
      presentation: null,
      strength: null,
      description: null
    }

    this.selectedDrug = null;
    this.selectedWeight = null;
    this.selectedPackage = null;
    this.selectedStrength = null;
    this.selectedBrand = null;
  
    this.uploadFiles = [];

    this.drug_details = {
      weights: [],
      brands: [],
      strengths: [],
      packagings: []
    }

    console.log(this.selectedDrug);
  }

}
