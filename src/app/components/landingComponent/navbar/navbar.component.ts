import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openNav: boolean = false
  show_header: boolean = false;

  constructor(private router: Router, public appService: AppService) { 
    this.router.events.subscribe((r: Event)=>{

      const no_header_routes = [
        "/registrations"
      ]
      
      if(r instanceof NavigationEnd){
        if (no_header_routes.includes(router.url.trim())) {
          this.show_header = true;
        } else {
          this.show_header = false; 
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        //this._loadingbar.complete();
      }
    })
  }

  ngOnInit(): void {
  }

  async logout() {
    localStorage.removeItem("logged_10mg_user");
    try {
      await this.appService.auth.signOut();
    }
    catch(e){}
    this.router.navigate(["/signin"]);
  }

}
