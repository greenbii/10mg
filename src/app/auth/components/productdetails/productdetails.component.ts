import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  product: any = null
  ratings: any[] = [1,2,3,4,5];
  current_address: any = null;
  required_quantity: number = 1;

  constructor(private route: ActivatedRoute, public appService: AppService) { }

  ngOnInit(): void {
    const p: any = this.route.snapshot.data;

    if(p.details) this.product = p.details;

    if(this.appService.current_business_details !== null && this.appService.current_business_details.addresses) {
      this.current_address = this.appService.current_business_details.addresses[0];
    }
  }

}
