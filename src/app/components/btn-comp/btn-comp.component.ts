import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-comp',
  templateUrl: './btn-comp.component.html',
  styleUrls: ['./btn-comp.component.css']
})
export class BtnCompComponent implements OnInit {


  constructor() { }

  @Input() properties = "Register your Pharmacy"
  @Input() styles = "primary-btn button"


  ngOnInit(): void {
  }



}
