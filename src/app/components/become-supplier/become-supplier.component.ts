import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-become-supplier',
  templateUrl: './become-supplier.component.html',
  styleUrls: ['./become-supplier.component.css']
})
export class BecomeSupplierComponent implements OnInit {

  constructor() { }

  becomeSupplier = 'Become a Supplier'

  styles = 'red-btn'

  ngOnInit(): void {
  }

}
