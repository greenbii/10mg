import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  steps: number = 1

  current_tab: string = 'pharmacist'

  constructor() { }

  ngOnInit(): void {
  }

}
