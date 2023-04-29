import { Component, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title = '10mg';

  show_nav_bar: boolean = true;

  constructor(private router: Router) {
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
          
        }
      })
  }
  
}
