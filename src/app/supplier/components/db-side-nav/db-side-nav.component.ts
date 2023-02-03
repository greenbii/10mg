import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-db-side-nav',
  templateUrl: './db-side-nav.component.html',
  styleUrls: ['./db-side-nav.component.css']
})
export class DbSideNavComponent implements OnInit {

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
