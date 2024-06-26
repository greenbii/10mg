import { Component, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AppService } from './services/app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title = '10mg';

  show_nav_bar: boolean = true;

  no_header_routes = [
    '/signin',
    '/signup',
    '/forgotpassword',
  ];

  constructor(private router: Router, public appService: AppService) {
      this.router.events.subscribe((e: Event)=>{
        if(e instanceof NavigationEnd || e instanceof NavigationStart)  {
          const test = /\/supplier/
          const test2 = /\/backend/
          if(test.test(this.router.url) || test2.test(this.router.url)) {
            this.show_nav_bar = false;
          }
          else {
            this.show_nav_bar = true;
          }

          /*if (this.no_header_routes.includes(e.url.trim()) || e.url.includes("login") || e.url.includes("register")) {
            this.show_nav_bar = false;
            try{
            }
            catch(e){}
          }
          else {
            this.show_nav_bar = true;
          }*/
          
        }
      })
  }

  handleDialogResponse(t: string) {
    if(t === 'y') {
      this.appService.dialogResponse.next(true)
    }
    else {
      this.appService.dialogResponse.next(false);
    }
  }
  
}
