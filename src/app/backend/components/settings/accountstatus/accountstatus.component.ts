import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-accountstatus',
  templateUrl: './accountstatus.component.html',
  styleUrls: ['./accountstatus.component.css']
})
export class AccountstatusComponent implements OnInit {

  uForm: FormGroup = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    date_of_transaction: new FormControl(null, [Validators.required])
  })

  adding_transaction: boolean = false;
  is_loaading: boolean = false;

  transactions: any[] = [];

  constructor(private appService:AppService) { }

  ngOnInit(): void {

    this.loadTransactions();
  }

  account_status = {
    status: "normal",
    rating: 5,
    cancellation_rate: 0,
    shipment_performance: "Good"
  }

  async addTransactions() {
    try {
      this.adding_transaction = true;
      const t = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('post', '/admin/analytics', this.uForm.value, t).toPromise();
      this.adding_transaction = false;
      if(rs?.status === true) {
        this.transactions.push(rs.data);
        this.uForm.reset();
      }
      else {
        throw rs?.message;
      }
    }
    catch(ee) {
      this.adding_transaction = false;
      alert(ee);
    }
  }

  async loadTransactions() {
    try {
      this.is_loaading = true;
      const t = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('get', '/admin/analytics', undefined, t).toPromise();
      this.is_loaading = false;
      if(rs?.status === true) {
        this.transactions = rs.data;
      }
      else {
        throw rs?.message;
      }
    }
    catch(ee) {
      this.is_loaading = false;
      alert(ee);
    }
  }

}
