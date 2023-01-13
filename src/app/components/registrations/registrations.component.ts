import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  this.router.navigate(["/signin"])

}

  registrations: any[] = [];
  is_loading_users: boolean = false;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.loadRegistrations()
  }

  async loadRegistrations() {
    try {
      const token = 'asdfghjklqwertyuiop';
      this.is_loading_users = true;
      const rs = await this.appService.initiateHttpRequest('get', '/registrations', null, token).toPromise();
      if(rs) {
        if(rs.status === true) {
          this.registrations = rs.data;
        }
        else {
          throw rs.message;
        }
      }
      this.is_loading_users = false;
      
    }
    catch(e: any){
      //alert(e.toString());
      console.log(e);
      this.is_loading_users = false;
    }
  }

}
