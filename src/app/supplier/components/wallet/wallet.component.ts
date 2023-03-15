import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  total_received: number = 0;

  transactions: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
