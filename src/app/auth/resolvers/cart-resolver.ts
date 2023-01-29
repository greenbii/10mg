import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Observable } from 'rxjs/internal/Observable';
import { AppService } from 'src/app/services/app.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()

export class CartResolver implements Resolve<any> {

    constructor(private appService: AppService, private router: Router, private auth:AngularFireAuth) {
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {

        return this.getData().catch(err=>{
          alert('Unable to retrieve the requested data');
        });
    }

    async getData() {
        try {
            
            const uToken = await this.appService.getCurrentUserToken();
            const resp = await this.appService.initiateHttpRequest('get', '/cart', null, uToken).toPromise();
            if(resp) {
                if(resp.status === true) {
                    //this.appMarketService.user_apps = resp.data.filter((apps)=> apps !== null);
                    return resp.data;
                }
                else {
                    return EMPTY;
                }
            }
            else {
                return EMPTY;
            }
        }
        catch(e) {
            //alert("Error!" + e.message);
            console.log(e);
            return EMPTY;
        }

    }
}
