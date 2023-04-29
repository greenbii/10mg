import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  total_received: number = 0;

  transactions: any[] = [];

  current_tab: string | null = "wallet";

  current_supplier: any = null;

  is_operation_in_progress: boolean = false;

  cForm: FormGroup = new FormGroup({
    payout_amount: new FormControl(null, [Validators.required, Validators.pattern(/[0-9]/)])
  })

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    const d: any = this.route.snapshot.data;
    if(d.wallet) {
      this.transactions = d.wallet;
      this.getTotalPendingPayouts();
    }

    this.route.queryParamMap.subscribe(s=>{
      if(s.has("tab")) {
        this.current_tab = s.get("tab");
      }
    })
  }

  getTotalPendingPayouts() {
    if(this.transactions.length !== 0) {
      let tt = 0;
      this.transactions.forEach(t=>{
        
        tt += parseFloat(""+t.wallet_balance);
      });

      this.total_received = tt;
      
    }

  }

  async completePayout() {
      try {
        if(this.current_supplier === null) throw "You must select a supplier to pay";

        if(parseFloat(""+this.cForm.value.payout_amount) > parseFloat(""+this.current_supplier.wallet_balance)) throw "Payout cannot be more than the available balance";
        
        const token = await this.appService.getCurrentUserToken();
        const resp = await this.appService.initiateHttpRequest('post', '/admin/initiate-payout', {supplier_id: this.current_supplier.business_id, amount: this.cForm.value.payout_amount}, token).toPromise();
        if(resp?.status === true){
          alert(resp.message);
        }
        else {
          throw resp?.message;
        }

        this.is_operation_in_progress = true;
      }
      catch(e: any) {
        this.is_operation_in_progress = false;
        console.log(e);
        alert(e.toString());
      }
  }

}
