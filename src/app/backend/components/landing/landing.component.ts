import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  openSideNav: boolean = true;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  async logout() {
    try {
      await this.appService.auth.signOut();
      this.appService.redirect("/signin");
    }
    catch(er) {
      alert(er)
    }
  }

}
