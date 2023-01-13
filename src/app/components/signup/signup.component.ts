import { Component, OnInit } from '@angular/core';
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

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  async register() {
    try {
      this.reg_error = null;
      this.is_registering = true;
      const rs = await this.appService.initiateHttpRequest('post', '/register', this.regForm.value).toPromise();
      if(rs?.status !== true) throw rs?.message;

      //this.steps += 1;
      this.is_registering = false;
      alert("You have successfully joined our waiting list, our sales representative will reach out to you soon");
      this.regForm.reset();
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
