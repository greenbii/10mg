import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-shop-top-nav',
  templateUrl: './shop-top-nav.component.html',
  styleUrls: ['./shop-top-nav.component.css']
})
export class ShopTopNavComponent implements OnInit {

  openShopNav: boolean = false

  constructor(private appService: AppService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.appService.redirect("/");
    }
    catch(e: any) {
      alert(e.toString());
    }
  }

}
