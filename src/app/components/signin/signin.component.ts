import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  error_message: string | null = null;

  signin() {
    //throw new Error('Method not implemented.');
    if(this.regForm.value.email === "admin@10mg.co.uk" && this.regForm.value.password === "asdfghjkl") {
      localStorage.setItem("logged_10mg_user", "admin@10mg.co.uk");
      this.router.navigate(["/registrations"]);
    }
    else {
      this.error_message = "If you have joined the waiting list, you will be contacted once the platform is opened for operation after the BETA testing presently ongoing, if you have not register, kindly use the register link below to join the waiting list";
      setTimeout(()=>{
        this.error_message = null;
      }, 15000)
    }
    
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
