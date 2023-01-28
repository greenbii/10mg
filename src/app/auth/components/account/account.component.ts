import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: string = 'B02409'
  title1: string = 'pharmacy details'
  title2: string = 'primary delivery address'
  title3: string = 'account settings'

  business: any = null;
  licence: any = null;
  address: any = null;


  constructor(private route: ActivatedRoute, public appService: AppService) { }

  ngOnInit(): void {
    //const u: any = this.route.snapshot.data;

    //if(u.details) console.log(u.details);

    this.business = this.appService.current_business_details.business;

    if(this.appService.current_business_details.verifications) {
      this.licence = this.appService.current_business_details.verifications[0];
    }

    if(this.appService.current_business_details.addresses) {
      this.address = this.appService.current_business_details.addresses[0];
    }

  }

}
