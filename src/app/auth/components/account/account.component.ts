import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: string = 'B02409'
  title1: string = 'pharmacy details'
  title2: string = 'primary delivery address'
  title3: string = 'account settings'

  business: any = null;
  licence: any = null;
  address: any = null;

  is_update_in_progress: boolean = false;

  states: string[] = [];
  cities: string[] = [];

  bRegForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required]),
    city: new FormControl(""),
    state: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required])
  })

  supRegForm: FormGroup = new FormGroup({
    licence_number: new FormControl(null, [Validators.required]),
    expiry_date: new FormControl(null, [Validators.required])
  })

  licenceFile!: File;
  cacFile!: File;


  constructor(private route: ActivatedRoute, public appService: AppService) { }

  ngOnInit(): void {
    //const u: any = this.route.snapshot.data;

    //if(u.details) console.log(u.details);

    this.states = this.appService.states.sort((a: any, b:any)=>{
      if(a > b) return 1;
      if(a < b) return -1;

      return 0;
    })

    this.business = this.appService.current_business_details.business;

    if(this.appService.current_business_details.verifications) {
      this.licence = this.appService.current_business_details.verifications[0];
    }

    if(this.appService.current_business_details.addresses) {
      this.address = this.appService.current_business_details.addresses[0];
    }

    if(this.address !== null) {
      this.bRegForm.patchValue({
        address: this.address.address,
        city: this.address.city,
        country: this.address.country,
        state: this.address.state
      })

      console.log(this.bRegForm.value.city);


      this.loadStateCities();
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

  async updateAddress() {
    try {
      this.is_update_in_progress = true;
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('post', '/address', {...this.bRegForm.value, id: this.address.id}, token).toPromise();
      this.is_update_in_progress = false;
      if(rs?.status === true) {
        this.address = rs.data;
        alert("Successfully updated address");
        document.getElementById("close-address-modal")?.click();
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

  async updateLicense() {
    try {
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('post', '/address', {...this.bRegForm.value, id: this.address.id}, token).toPromise();
      if(rs?.status === true) {
        this.address = rs.data;
        alert("Successfully updated address");
        document.getElementById("close-address-modal")?.click();
      }
      else {
        throw rs?.message;
      }
    }
    catch(er: any) {
      alert(er.toString())
    }
  }

  handleFileSelection($event: any, type: string) {
    if($event.target.files.length !== 0) {
      const fl = $event.target.files[0] as File;
      if(type === 'cac') {
        this.cacFile = fl;
      }
      else {
        this.licenceFile = fl;
      }
    }
  }

  

}
