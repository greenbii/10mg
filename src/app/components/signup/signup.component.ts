import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
requestVerificationCode() {
throw new Error('Method not implemented.');
}

  regForm: FormGroup = new FormGroup({
    contact_person: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    phone: new FormControl(null),
    pharmacy_name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    confirm_password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    position: new FormControl(null)
  })

  steps: number = 1;

  current_tab: string = 'pharmacist'
  reg_error: string | null = null;
  reveal_password: boolean = false;
  is_registering: boolean = false;
  is_uploading: boolean = false;

  supplier_shipment_mode: string = "10mg"

  licenceFile!: File;
  cacFile!: File;

  code_fields: any[] = new Array(6).fill(null);

  bRegForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required]),
    city: new FormControl(""),
    state: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required])
  })

  pharmForm: FormGroup = new FormGroup({
    licence_number: new FormControl(null, [Validators.required]),
    expiry_date: new FormControl(null, [Validators.required]),
  })

  states: string[] = [];
  cities: string[] = [];

  supRegForm: FormGroup = new FormGroup({
    licence_number: new FormControl(null, [Validators.required]),
    expiry_date: new FormControl(null, [Validators.required]),
    bank: new FormControl(null, [Validators.required]),
    account_number: new FormControl(null, [Validators.required]),
    currency: new FormControl(null, [Validators.required])
  })

  constructor(private appService: AppService, private auth: AngularFireAuth, private fStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.states = this.appService.states.sort((a: any, b:any)=>{
      if(a > b) return 1;
      if(a < b) return -1;

      return 0;
    })
  }

  checkValidCodeInput() {
    return this.code_fields.some(s=> s === null)
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

  async verifyToken(){
    try {
      this.is_registering = true;
      const token = await this.appService.getCurrentUserToken();
      //use the token to verify the code
      const response = await this.appService.initiateHttpRequest("post", "/verify-user-email", {code: this.code_fields.join("")}, token || undefined).toPromise();
      if(response?.status === true) {
        //move to the next step
        alert(response.message);
        this.steps += 1;
      }
      else {
        alert(response?.message)
      }
      this.is_registering = false;
    }
    catch(e){
      console.log(e);
      alert(e);
      this.is_registering = false;
    }
  }

  async register() {
    try {
      this.reg_error = null;
      this.is_registering = true;
      const rs = await this.appService.initiateHttpRequest('post', '/register', {...this.regForm.value, customer_type: this.current_tab}).toPromise();
      if(rs?.status !== true) throw rs?.message;

      //login the user before proceeding to next step
      const sp = await this.auth.signInWithEmailAndPassword(this.regForm.value.email, this.regForm.value.password);
      

      this.steps += 1;
      this.is_registering = false;
      //alert("You have successfully joined our waiting list, our sales representative will reach out to you soon");
      //this.regForm.reset();
    }
    catch(e: any) {
      console.log(e);
      this.reg_error = e.toString();
      this.is_registering = false;
    }
  }

  get f() {
    return this.regForm.controls
  }

  proceed() {
    if(this.current_tab === 'supplier') {
      //navigate to dashboard
      this.appService.redirect("/sup");
    }
    else {
      //navigate to shop
      this.appService.redirect("/auth/shop")
    }
  }

  completeReg() {
    if(this.current_tab === 'pharmacist') {
      this.submitRegistration().then(d=>{
        if(d) this.steps = 5
      })
      
    }
    else {
      //handle for the supplier here
      if(this.steps === 5) {
        //handle the submission here
        this.submitRegistration().then(d=>{
          if(d) this.steps = 6;
        })
      }
      else {
        this.steps = 5
      }
    }
  }

  async submitRegistration() {
    try {
      this.is_registering = true;
      //upload the documents, if thats successful
      //then send the link and other details
      //to the backend for recording


      //handle upload
      const uFiles = await this.uploadFiles()
      const dt = this.current_tab === 'supplier' ? {...this.supRegForm.value, shipment_mode: this.supplier_shipment_mode} : {...this.pharmForm.value, ...this.bRegForm.value}
      const token = await this.appService.getCurrentUserToken();
      const resp = await this.appService.initiateHttpRequest('post', '/complete-registration', {...dt, cac: uFiles.cac, licence: uFiles.licence}, token).toPromise();
      if(resp?.status !== true) {
        alert(resp?.message);
        this.is_registering = false;
        return false;
      }

      //finish up here
      this.is_registering = false;
      return true;
    }
    catch {
      this.is_registering = false;
      return false;
    }
  }

  async uploadFiles() {
    try {
      if(!this.cacFile || !this.licenceFile) throw "You must select both CAC ad Licence file to proceed";

      this.is_uploading = true;
      const random = Math.random().toString().split(".")[1];
      const ext1 = this.cacFile.name.toLowerCase().split(".").pop();
      const ext2 = this.licenceFile.name.toLowerCase().split(".").pop();


      const ee = await Promise.all([
        this.fStorage.upload("/documents/"+"cac_"+random+"."+ext1, this.cacFile).then(async a=>{
          return await a.ref.getDownloadURL()
        }),
        this.fStorage.upload("/documents/"+"licence_"+random+"."+ext2, this.licenceFile).then(async a=>{
          return await a.ref.getDownloadURL()
        })
      ]
      )
      this.is_uploading = false;
      return {cac: ee[0], licence: ee[1]}
    }
    catch(ee) {
      this.is_uploading = false;
      throw ee;
    }
  }

}
