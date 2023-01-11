import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  requests: Observable<responseObject>[] = [];

  constructor(private httpClient: HttpClient) { 
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
}
