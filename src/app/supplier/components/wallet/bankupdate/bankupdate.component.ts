import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-bankupdate',
  templateUrl: './bankupdate.component.html',
  styleUrls: ['./bankupdate.component.css']
})
export class BankupdateComponent implements OnInit {

  bForm: FormGroup = new FormGroup({
    bank: new FormControl(null, [Validators.required]),
    account_number: new FormControl(null, Validators.required),
    account_name: new FormControl(null, [Validators.required])
  })

  is_ver_in_progress: boolean = false;
  is_operation_in_progress: boolean = false;

  banks: any[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    //load banks
    this.getBanks();
    const tt: any = this.route.snapshot.data;
    if(tt.bank && tt.bank !== null) {
      this.bForm.setValue(tt.bank)
    }
  }

  async getBanks() {
    const rq = await this.appService.initiateHttpRequest('get', '/banks', undefined).toPromise();

    if(rq?.status === true) {
      this.banks = rq.data;
    }
  }

  async resolveAccountNumber() {
    const account_num = this.bForm.value.account_number as string | null;
    const bank_code = this.bForm.value.bank as string | null

    //console.log(account_num, bank_code);
    try {
      if(bank_code !== null && account_num !== null && account_num.trim().length !== 0 && account_num.length === 10) {
        //resolve the account number
        this.is_ver_in_progress = true;
        const rs = await this.appService.initiateHttpRequest('post', '/bank-account-verification', {bank: bank_code, account_number: account_num}, undefined).toPromise();
        if(rs?.status === true) {
          //get the account name
          this.bForm.patchValue({account_name: rs.data})
        }
        else {
          throw rs?.message;
        }
        this.is_ver_in_progress = false;
      }
    }
    catch(e: any){
      this.is_ver_in_progress = false;
      alert(e.toString())
    }
  }

  async saveAccountDetails() {
    try {
      this.is_operation_in_progress = true;
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('post', '/supplier/bank-details', this.bForm.value, token).toPromise();
      if(rs?.status === true) {
        alert("Account Details successfully save!");
      }
      else {
        throw rs?.message;
      }
      this.is_operation_in_progress;
    }
    catch(e: any) {
      alert(e.toString())
      this.is_operation_in_progress = false;
    }
  }

}
