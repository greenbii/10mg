import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * This is the expected response object from the Greenbii API Server
 */
 export interface responseObject {
  /**
   * The status of the request, can either be 'true' or 'false'
   */
  status: boolean,
  /**
   * Any message describing the status of the response
   */
  message: string | null,
  /**
   * Error is sometimes provided to further explain the reason for a failure
   */
  error?: string | null,
  /**
   * Only available if the status of the response is 'true', contains data from the server
   */
  data?: any
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  is_request_in_progress: boolean = false;

  _is_current_user: boolean = false;
  current_business_details: any = null;
  current_user: any = null;

  requests: Observable<responseObject>[] = [];

  dialogDetails: any = {
    title: null,
    prompt: null
  }

  current_customer_cart: any = null;

  products: any[] = [];

  dialogResponse: BehaviorSubject<boolean> = new BehaviorSubject(false);



  constructor(private httpClient: HttpClient, public auth: AngularFireAuth, private router: Router) { 
    this.auth.onAuthStateChanged(u=>{
      if(u && u !== null) {
        this._is_current_user = true;
        this.current_user = u;

        //load the current customer cart
        this.loadCustomerCart()
      }
      else {
        this._is_current_user = false;
        this.current_business_details = null;
        this.current_user = null
        this.current_customer_cart = null;
      }
    })
  }


  /**
   * 
   * @param type | Specify the type of the request one of post,get,delete or put
   * @param endpoint | The RESTful Endpoint where the request is meant to be sent
   * @param data | Any companying data for this request
   * @param token | Authorization token if required for this request
   * @returns responseObject
   */
  initiateHttpRequest(type: string = 'post' || 'get' || 'delete' || 'put', endpoint: string, data?: any, token?: string) {
    const req = this.httpClient.request<responseObject>(type, environment.apiURL + endpoint, {
      withCredentials: true,
      body: data && data !== null ? data : undefined,
      headers: (token) ? new HttpHeaders({ 'x-auth-token': token }) : undefined
      }).pipe(
        tap((resp: responseObject)=>{
          /*if(resp.error && resp.error === "TokenExpiredError") {
            this.router.navigate(["/", "accounts"], {queryParams: {returnURL: this.router.url}})
          }*/
        }),
        catchError(e=>{
          //console.log(e);
          //return e; //null;
          const err: responseObject = {status: false, message: e.toString()}
          throw err;
        })
      )
      /*this.requests.push(
        req
      )*/
      return req;
  }

  async getCurrentUser() {
    try {
      const u = await this.auth.currentUser
      if(u !== null) return u;

      throw "No signed in user";
    }
    catch(er) {
      //console.log(er)
      //return null;
      throw er;
    }  
  }

  async getCurrentUserClaims() {
    try {
      const u = await this.auth.currentUser;
      if(u !== null) {
        return await u.getIdTokenResult()
      }
      throw "No signed in user is available";

    }
    catch(er){
      //console.log(er);
      throw er;
    }
  }

  async getCurrentUserToken() {
    try {
      const u = await this.auth.currentUser
      if(u !== null) return await u.getIdToken();

      throw "No signed in user";
    }
    catch(er) {
      //console.log(er)
      //return null;
      throw er;
    }  
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  getCurrencySymbol(cur: string) {
    if(cur === "NGN") return "₦";

    if(cur === "USD") return "$";

    return '£';
  }

  showConfirmDialog(title: string, msg_prompt: string): Observable<boolean> {
    this.dialogDetails.title = title;
    this.dialogDetails.prompt = msg_prompt;
    const tt = document.getElementById("open-confirm-dialog")?.click();
    return this.dialogResponse;
  }

  async loadCustomerCart() {
    try {
      const uToken = await this.getCurrentUserToken();
      const resp = await this.initiateHttpRequest('get', '/cart', null, uToken).toPromise();
      if(resp) {
          if(resp.status === true) {
              //this.appMarketService.user_apps = resp.data.filter((apps)=> apps !== null);
              this.current_customer_cart = resp.data;
          }
          else {
              throw resp.message;
          }
      }
    }
    catch(er) {
      console.log(er);
    }
  }


  states: string[] = [
    "lagos",
    "abia",
    "anambra",
    "abuja",
    "delta",
    "ondo",
    "bauchi",
    "bayelsa",
    "benue",
    "borno",
    "ebonyi",
    "edo",
    "cross river",
    "enugu",
    "ekiti",
    "kogi",
    "niger",
    "gombe",
    "kwara",
    "kano",
    "kaduna",
    "katsina",
    "ogun",
    "oyo",
    "osun",
    "plateau",
    "imo",
    "rivers",
    "sokoto",
    "adamawa",
    "akwa ibom",
    "kebbi",
    "nasarawa",
    "taraba",
    "yobe",
    "zamfara"
  ]

  
}
