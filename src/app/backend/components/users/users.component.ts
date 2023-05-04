import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:  any[] = [];
  allusers: any[] = [];
  current_tab = 'supplier';
  is_operation_in_progress: boolean = false;
  is_loading_users: boolean = false;
  selected_user: any = null;

  action: string = "";

  constructor(private appService: AppService, private router: Router) { }
  ngOnInit(): void {
    this.loadRegistrations()
  }

  switchUser(user: string) {
    this.users = this.allusers.filter(f=> (f.type !== null && f.type.toLowerCase() ===  user.toLowerCase()));
  }

  async loadRegistrations() {
    try {
      const token = 'asdfghjklqwertyuiop';
      this.is_loading_users = true;
      const rs = await this.appService.initiateHttpRequest('get', '/registrations', null, token).toPromise();
      if(rs) {
        if(rs.status === true) {
          this.allusers = rs.data;
          this.switchUser(this.current_tab)
        }
        else {
          throw rs.message;
        }
      }
      this.is_loading_users = false;
      
    }
    catch(e: any){
      //alert(e.toString());
      console.log(e);
      this.is_loading_users = false;
    }
  }

  async changeUserStatus() {
    if(this.selected_user !== null) {
      //handle the user account status here
      try {
        this.is_operation_in_progress = true;
        const token = await this.appService.getCurrentUserToken();
        const resp = await this.appService.initiateHttpRequest('post', '/admin/change-supplier-status', {business_id: this.selected_user.id, action: this.action}, token).toPromise();
        if(resp?.status === true) {
          const ff = this.users.findIndex(f=> f.id === this.selected_user.id);
          if(ff !== -1) this.users[ff].status === resp.data;

          const fff = this.allusers.findIndex(f=> f.id === this.selected_user.id);
          if(fff !== -1) this.allusers[fff].status = resp.data;

          document.getElementById("close-modal")?.click();
        }
        else {
          throw  resp?.message;
        }

        this.is_operation_in_progress = false;
      }
      catch(ee:any){
        console.log(ee);
        this.is_operation_in_progress = false;
        alert(ee.toString());
      }
    }
  }

  approveUser() {
    if(confirm("Are you sure you want to "+this.action+" this user account?")) return;
    this.appService.showConfirmDialog("Approve User", "Are you sure you want to approved this user account?").subscribe(s=>{
      if(s) {
        console.log("User selected Yes")
      }
      else {
        console.log("User selected No");
      }
    }).unsubscribe();
  }

  async disapproveUser() {
    //handle the user operation here
    this.changeUserStatus()
  }

}
