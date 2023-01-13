import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  regForm: FormGroup = new FormGroup({
    
  })
signin() {
  //throw new Error('Method not implemented.');
  
}

  constructor() { }

  ngOnInit(): void {
  }

}
