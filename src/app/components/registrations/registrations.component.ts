import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
logout() {
  //throw new Error('Method not implemented.');
  localStorage.removeItem("logged_10mg_user");

}

  registrations: any[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  async loadRegistrations() {
    try {
      const token = 'asdfghjklqwertyuiop';
      const rs = await this.appService.initiateHttpRequest('get', '/registrations', token).toPromise();
      if(rs.status === true) {
        this.registrations = rs.data;
      }
      else {
        throw rs.message;
      }
    }
    catch(e: any){
      alert(e.toString());
    }
  }

}
