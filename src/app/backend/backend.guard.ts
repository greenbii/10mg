import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class BackendGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  this.checkLoggedInUser();
  }

  constructor(private appService: AppService) {

  }

  async checkLoggedInUser() {
    try {
      const u = await this.appService.getCurrentUser();

      if(u === null) throw "Seems there is no signed in user"

      if(!u.email) throw "Unauthorized account check and try again";

      if(u.email !== "admin@10mg.co.uk") throw "Account not authorize to visit route";

      return true;
    }
    catch(er) {
      console.log(er);
      return false;
    }
  }
  
}
