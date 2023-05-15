import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  has_sent_code: boolean = false;
  complete_password_reset: boolean = false;

  regForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)])
  })

  cForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    confirm_password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    confirmation_code: new FormControl(null, [Validators.required])
  })

  error_message: string | null = null;
  is_signing_in: boolean = false;
  is_operation_in_progress: boolean = false;



  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
  }

  async initiateForgotPassword() {
    //send code to the user to enable them reset their password
    this.error_message = null;
    if(!this.has_sent_code) {
      try {
        this.is_signing_in = true;
        const rs = await this.appService.initiateHttpRequest("post", "/forgot-password", {email: this.cForm.value.email}).toPromise();

        if(rs?.status === true) {
          this.has_sent_code = true;
        }
        else {
          throw rs?.message;
        }
        this.is_signing_in = false;
      }
      catch(e: any) {
        this.error_message = e.toString();
        this.is_signing_in = false;
      }
    }
    else {
      try {
        this.is_signing_in = true;
        const rs = await this.appService.initiateHttpRequest("put", "/forgot-password", {...this.cForm.value}).toPromise();

        if(rs?.status === true) {
          this.complete_password_reset = true;
        }
        else {
          throw rs?.message;
        }

        this.is_signing_in = false;
      }
      catch(e: any){
        this.error_message = e.toString();
        this.is_signing_in = false;
      }
    }
  }

}
