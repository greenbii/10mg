import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any = {
    name: "Nordic Normal",
    
  }

  business: any = null;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    //console.log(this.appService.current_business_details);

    this.business = this.appService.current_business_details.business;
  }

}
