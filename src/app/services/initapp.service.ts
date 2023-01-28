import { Injectable, Injector} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import awsmobile from 'src/aws-exports';
const domain = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") ? 'localhost' : 'greenbii.com';
const secure = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") ? false : true;

@Injectable({
  providedIn: 'root'
})
export class InitappService {

  currentUser: any = null;

  constructor(private auth: AngularFireAuth, private injector: Injector) { }

  /*async initializeApp(): Promise<any> {
    console.log("I think I was here brother")
    return this.auth.currentUser.then(u=> {
      console.log(u);
      return true;
      //return true;
    }).catch(e=>{
      return false;
    });
  }*/

  initializeApp(): Promise<any> {
    return new Promise(((resolve, reject) => {
        this.injector.get(AngularFireAuth).onAuthStateChanged(async (u)=>{
          resolve({})
        }, (err)=>{
          resolve({});
        })
    }))
  }

  /*initializeApp(): Promise<any> {
    return new Promise(((resolve, reject) =>{
      this.injector.get(AngularFireAuth).onAuthStateChanged(async u=>{
        if(u) {
          //const uToken = await u.getIdTokenResult();
          resolve(true);
        }
        else {
          try {
            const resp: any = await this.httpClient.get(environment.apiURL+'/signin', {withCredentials: true}).toPromise();
            if(resp.status) {
              await this.auth.signInWithCustomToken(resp.data.token)
            }
            resolve(true);
          }
          catch(e) {
            resolve(true);
          }
        }
      })
    }))
  }*/
}
