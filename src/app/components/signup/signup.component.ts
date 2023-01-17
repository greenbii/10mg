import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regForm: FormGroup = new FormGroup({
    contact_person: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    phone: new FormControl(null),
    pharmacy_name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    confirm_password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    position: new FormControl(null, Validators.required)
  })

  steps: number = 1

  current_tab: string = 'pharmacist'
  reg_error: string | null = null;
  reveal_password: boolean = false;
  is_registering: boolean = false;

  code_fields: string[] = new Array(6).fill(null);

  bRegForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required]),
    city: new FormControl(null),
    state: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required])
  })

  constructor(private appService: AppService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  checkValidCodeInput() {
    return this.code_fields.some(s=> s === null)
  }

  requestVerificationCode() {

  }

  async register() {
    try {
      this.reg_error = null;
      this.is_registering = true;
      const rs = await this.appService.initiateHttpRequest('post', '/register', {...this.regForm.value, type: this.current_tab}).toPromise();
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

}
