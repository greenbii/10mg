import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Observable } from 'rxjs/internal/Observable';
import { AppService } from 'src/app/services/app.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()

export class ProductDetailResolver implements Resolve<any> {

    constructor(private appService: AppService, private router: Router, private auth:AngularFireAuth) {
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
        if(!route.paramMap.has("id")) {
            if(this.appService.current_business_details.business.customer_type === "Pharmacy") {
                this.appService.redirect("/auth/shop");
            }
            else {
                this.appService.redirect("/supplier/products");
            }
            return EMPTY;
        }

        const id = route.paramMap.get("id")
        return this.getData(id).catch(err=>{
          alert('Unable to retrieve the requested data');
        });
    }

    async getData(id: any) {
        try {
            const uToken = await this.appService.getCurrentUserToken();
            const resp = await this.appService.initiateHttpRequest('get', '/product/'+id, null, uToken).toPromise();
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
