import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  is_operation_in_progress: boolean = false;

  error_message: string | null = null;

  uForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirm_password: new FormControl(null, [Validators.required])
  });

  cForm: FormGroup = new FormGroup({
    confirmation_code: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
  })




  constructor(private appService: AppService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async changePassword() {
    try {
      //try to change the password here
      if(this.uForm.value.password !== this.uForm.value.confirm_password) {
        throw "Password and confirm password must match";
        //return;
      }
      this.is_operation_in_progress = true;
      const token = await this.appService.getCurrentUserToken();
      const resp = await this.appService.initiateHttpRequest('get', '/auth/reset-password', undefined, token).toPromise();
      if(resp?.status === true) {
        const s = document.getElementById("btnLaunch")?.click();
      }
      else {
        throw resp?.message;
      }
      this.is_operation_in_progress = false;
    }
    catch(e: any) {
      //alert(e.toString());
      this.error_message = e.toString();
      this.is_operation_in_progress = false;
      this.dismiss();
    }
  }

  async completeChangePassword() {
    try {
      //try to change the password here
      const token = await this.appService.getCurrentUserToken();
      const resp = await this.appService.initiateHttpRequest('post', '/auth/reset-password', {...this.uForm.value, ...this.cForm.value}, token).toPromise();
      if(resp?.status === true) {
        alert("You have successfully reset your password, you will be signed out now, please login again");
        await this.auth.signOut();
        this.appService.redirect("/login");
      }
      else {
        throw resp?.message;
      }
      this.is_operation_in_progress = false;
    }
    catch(e: any) {
      //alert(e.toString());
      this.error_message = e.toString();
      this.is_operation_in_progress = false;
      this.dismiss();
    }
  }

  dismiss() {
    setTimeout(()=>{
      this.error_message = null;
    }, 5000)
  }

}
