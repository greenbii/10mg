import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'edit-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class EditproductComponent implements OnInit {

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
    quantity: null,
    strength_value: null,
    discount_price: null,
    actual_price: null,
    description: null,
    images: []
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

  selling_currency: string = "";

  edit_product: any = null;




  constructor(private appService: AppService, private fStorage: AngularFireStorage,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.current_user_id = this.appService.current_user.uid;

    this.loadDrugs();

    this.selling_currency = this.appService.getCurrencySymbol("NGN");

    if(this.route.snapshot.paramMap.has("id")) {
      const p: any = this.route.snapshot.data;

      if(p.details) this.edit_product = p.details;

      this.product = {
        name: this.edit_product.drug.name,
        brand: this.edit_product.brand.name,
        package_per_roll: this.edit_product.brand.packaging.package_per_roll,
        weight: this.edit_product.brand.packaging.weight,
        presentation: this.edit_product.brand.variation !== null ? this.edit_product.brand.variation.presentation : null,
        strength: this.edit_product.brand.variation !== null ? this.edit_product.brand.variation.strength : null,
        quantity: this.edit_product.quantity,
        strength_value: this.edit_product.brand.variation !== null ? this.edit_product.brand.variation.strength_value : null,
        discount_price: this.edit_product.discount_price,
        actual_price: this.edit_product.actual_price,
        description: this.edit_product.brand.variation !== null ? this.edit_product.brand.variation.description : null,
        images: this.edit_product.images !== null ? this.edit_product.images : []
      }

      this.loadDrugDetails().then(d=>{
        this.selectedDrug = {label: this.edit_product.drug.name.toString().toUpperCase(), value: this.edit_product.drug.drug_id}
        this.selectedBrand = {label: this.edit_product.brand.name.toString().toUpperCase(), value: this.edit_product.brand.id};
        this.selectedPackage = {label: this.product.package_per_roll, value: this.edit_product.brand.packaging.package_id}
        this.selectedWeight = {label: this.product.weight, value: this.edit_product.brand.packaging.package_id}
      })


      //load the details of the drug

    }
  }

  checkAllowDrugEditing() {
    if(this.selectedDrug === null) return false;
    //return this.selectedDrug !== null && this.selectedDrug['__isNew__'] || (this.selectedDrug['added_by'] && this.selectedDrug['added_by'] === this.current_user_id)
    return this.selectedDrug !== null;
  }

  isFormValid() {

    if( 
      this.selectedDrug === null 
      || this.product.strength === null
      || this.product.presentation === null
      || this.product.strength_value === null) return false;

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

  removeUploadFile(index: number) {
    if(this.uploadFiles[index]) {
      this.uploadFiles.splice(index, 1);
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
      let images = []
      if(this.uploadFiles.length !== 0) {
        images = await this.uploadImages()
        this.product.images = this.product.images.concat(images)
      }

      //handle the remaining aspect of the registration

      //let dt = {...this.product};
      //if(this.edit_product !== null) dt.product_id = this.
      const token = await this.appService.getCurrentUserToken()
      const response = await this.appService.initiateHttpRequest(this.edit_product !== null ? "put" : "post", "/products"+(this.edit_product !== null ? "?p="+this.edit_product.product_id : ""), this.product, token).toPromise();
      if(response?.status === true) {
        //inform the user that the operation was successful
        alert(response.message);
        if(this.product_details === null) {
          this.resetForm();
        }
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

  async uploadImages() {
    try {
      if(this.uploadFiles.length === 0) throw "You must add at least 1 image file to proceed";

      this.is_uploading = true;
      const random = Math.random().toString().split(".")[1];


      const ee = await Promise.all(
        this.uploadFiles.map(ff=>{
          const ext = ff.name.toLowerCase().split(".").pop();
          return this.fStorage.upload("/productimages/"+"_product"+random+"."+ext, ff).then(async a=>{
            return await a.ref.getDownloadURL()
          })
        })
      )
      this.is_uploading = false;
      return ee;
    }
    catch(ee) {
      this.is_uploading = false;
      throw ee;
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
    
    if(this.product.strength !== null && this.product.strength_value !== null && this.product.presentation !== null) {
      //console.log(this.product.strength, this.product.presentation, this.product.strength_value);
      //load the description
      if(this.product_details.variations.length !== 0) {
        const desc = this.product_details.variations.find((f:any)=> {
          //console.log("Strength Value: ",f.strength_value, "Strength: ", f.strength, "Presentation: ", f.presentation)
          const t1 = (f.strength_value+""+f.strength+" "+f.presentation).toString().trim();
          const t2 = (this.product.strength_value+""+this.product.strength+" "+this.product.presentation).toString().trim();
          return t1 === t2;
          //return f.presentation === this.product.presentation && f.strength === this.product.strength && f.strength_value === this.product.strength_value
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
      strength_value: null,
      quantity: null,
      discount_price: null,
      actual_price: null,
      description: null,
      images: []
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
