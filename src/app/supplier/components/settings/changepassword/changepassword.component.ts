import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  is_operation_in_progress: boolean = false;

  uForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirm_password: new FormControl(null, [Validators.required])
  });

  cForm: FormGroup = new FormGroup({
    confirmation_code: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
  })




  constructor() { }

  ngOnInit(): void {
  }

  changePassword() {
    //try to change the password here
    const s = document.getElementById("btnLaunch")?.click();
  }

}
