import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  total_received: number = 0;

  transactions: any[] = [];

  current_tab: string | null = "wallet";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const d: any = this.route.snapshot.data;
    if(d.wallet) {
      this.transactions = d.wallet.trx;
      this.total_received = d.wallet.balance;
    }

    this.route.queryParamMap.subscribe(s=>{
      if(s.has("tab")) {
        this.current_tab = s.get("tab");
      }
    })
  }

}
