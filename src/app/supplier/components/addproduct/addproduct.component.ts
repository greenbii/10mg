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




  constructor(private appService: AppService, private fStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.current_user_id = this.appService.current_user.uid;

    this.loadDrugs();
  }

  checkAllowDrugEditing() {
    if(this.selectedDrug === null) return false;
    return this.selectedDrug !== null && this.selectedDrug['__isNew__'] || (this.selectedDrug['added_by'] && this.selectedDrug['added_by'] === this.current_user_id)
  }

  isFormValid() {

    if(this.selectedWeight === null || 
      this.selectedDrug === null || 
      this.selectedPackage === null
      || this.selectedStrength === null
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
              return {...b, label: b.name, value: b.brand_id}
            });
          }

          //get the available strengths for this drug
          if(response.data.variations && response.data.variations.length !== 0) {
            this.drug_details.strengths = response.data.variations.map((b: any)=>{
              return {...b, label: b.strength, value: b.id}
            });
          }

          if(response.data.packaging && response.data.packaging.length !== 0) {
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
      if(this.uploadFiles.length !== 0) {
        this.product.images = await this.uploadImages()
      }

      //handle the remaining aspect of the registration
      const token = await this.appService.getCurrentUserToken()
      const response = await this.appService.initiateHttpRequest("post", "/products", this.product, token).toPromise();
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

  resetForm() {
    this.product = {
      name: null,
      brand: null,
      package_per_roll: null,
      weight: null,
      presentation: null,
      strength: null,
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
