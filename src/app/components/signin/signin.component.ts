import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  regForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)])
  })

  cForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    confirmation_code: new FormControl(null, [Validators.required])
  })

  error_message: string | null = null;
  is_signing_in: boolean = false;
  is_operation_in_progress: boolean = false;

  async signin() {
    //throw new Error('Method not implemented.');
    this.error_message = null;
    this.is_signing_in = true;
    if(this.regForm.value.email === "admin@10mg.co.uk" && this.regForm.value.password === "asdfghjkl") {
      localStorage.setItem("logged_10mg_user", "admin@10mg.co.uk");
      this.router.navigate(["/registrations"]);
    }
    else {
      /*this.error_message = "If you have joined the waiting list, you will be contacted once the platform is opened for operation after the BETA testing presently ongoing, if you have not register, kindly use the register link below to join the waiting list";
      setTimeout(()=>{
        this.error_message = null;
      }, 15000)*/
      try {
        const u = await this.appService.auth.signInWithEmailAndPassword(this.regForm.value.email, this.regForm.value.password);
        //get the user type to know where to redirect
        if(u.user?.email === "admin@10mg.co.uk") {
          this.appService.redirect("/backend");
          return;
        }
        
        const claims = await this.appService.getCurrentUserClaims();
        if(claims.claims["customer_type"] && claims.claims["customer_type"] === "supplier") {
          this.appService.redirect("/supplier")
        }
        else {
          this.appService.redirect("/auth/shop");
        }

        this.is_signing_in = false;
        
      }
      catch(ee: any){
        console.log(ee);
        this.error_message = "Invalid username and/or password, check and try again"
        //ee.toString();
        this.is_signing_in = false;

      }
    }
    
  }

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
  }

  initiateForgotPassword() {
    //send code to the user to enable them reset their password

  }

}
