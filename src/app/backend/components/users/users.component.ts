import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  current_edit_id: string = "";
  show_edit_user: boolean = false;
  current_user_licence: any = null;

  action: string = "";

  uDetailsForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    contact_person: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.pattern(/0-9+/)]),
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  lDetails: FormGroup = new FormGroup({
    licence_no: new FormControl(null, [Validators.required]),
    expiry_date: new FormControl(null, [Validators.required])
  })

  states: string[] = [];
  cities: any[] = [];

  licenceFile!: File;
  cacFile!: File;

  constructor(private appService: AppService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(ss=>{
      if(ss.has("edit")) {
        this.current_edit_id = ss.get("edit") || "";
      }
    })
    this.loadRegistrations();

    this.states = this.appService.states.sort((a: any, b:any)=>{
      if(a > b) return 1;
      if(a < b) return -1;

      return 0;
    })
  }

  switchUser(user: string) {
    if(user === 'pharmacy') { this.users = this.allusers.filter(f=> ((f.type !== null && f.type.toLowerCase() ===  user.toLowerCase()) || f.type === "" || f.type === null)); return; }
    this.users = this.allusers.filter(f=> (f.type !== null && f.type.toLowerCase() ===  user.toLowerCase()));
  }

  async loadRegistrations() {
    try {
      const token = 'asdfghjklqwertyuiop';
      this.is_loading_users = true;
      const rs = await this.appService.initiateHttpRequest('get', '/admin/registrations', null, token).toPromise();
      if(rs) {
        if(rs.status === true) {
          this.allusers = rs.data;
          this.switchUser(this.current_tab);

          //check if edit option is available
          if(this.current_edit_id.trim() !== "") {
            //get the current user
            const tt = this.allusers.find(ff=> ff.id === this.current_edit_id);
            if(tt) {
              this.editUser(tt);
            }
          }

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
    if(!confirm("Are you sure you want to "+this.action+" this user account?")) return;

    this.changeUserStatus();
  }

  async disapproveUser() {
    //handle the user operation here
    this.changeUserStatus()
  }

  async deleteUserAccount() {
    if(!confirm("Are you sure you want to delete this user account?")) return;

    try {
      const token = await this.appService.getCurrentUserToken();

      const rs = await this.appService.initiateHttpRequest('delete', '/admin/users', {business_id: this.selected_user.id}, token).toPromise();
      if(rs?.status === true) {
        alert("Successfully delete user record");
        const uu = this.allusers.findIndex(ff=> ff.id === this.selected_user.id);
        if(uu !== -1) {
          this.allusers.splice(uu, 1);
          const uuu = this.users.findIndex(ff=> ff.id === this.selected_user.id);
          if(uuu !== -1) {
            this.users.splice(uuu, 1);
          }
        }
      }
      else {
        alert(rs?.message);
      }
    }
    catch(e) {
      alert(e);
    }
  }

  async editUser(u: any) {
    this.selected_user = u;
    this.uDetailsForm.patchValue({
      name: u.name,
      contact_person: u.contact_person,
      email: u.email,
      phone: u.phone
    })

    if(u.verifications && u.verifications.length !== 0) {
      const u_licence = u.verifications[0];
      this.lDetails.patchValue({
        licence_no: u_licence.licence_number,
        expiry_date: u_licence.expiry_date
      });

      this.current_user_licence = u_licence;
    }

    if(u.addresses && u.addresses.length !== 0) {
      //this.cities = u.addresses.map((m:any)=> []);
      await Promise.all(u.addresses.map(async (m:any, i:number)=>{
        await this.loadStateCities(m.state, i)
      }))
    }

    this.show_edit_user = true;

  }

  async loadStateCities(state: string | null, index: number) {
    try {
    //load the available cities for the selected state
      if(state !== null && state.trim() !== "") {
        //load the cities available for this state
        const rs = await this.appService.initiateHttpRequest("get", "/available-cities/"+state).toPromise();
        if(rs?.status === true) {
          this.cities[index] = [];
          //this.bRegForm.patchValue({city: ""});
          this.cities[index] = rs.data.map((d: any)=> d.destination_area)
        }
      }
    }
    catch(e){
      console.log(e);
    }
  }

  handleFileSelection($event: any, type: string) {
    if($event.target.files.length !== 0) {
      const fl = $event.target.files[0] as File;
      if(type === 'cac') {
        this.cacFile = fl;
      }
      else {
        this.licenceFile = fl;
      }
    }
  }

  async loginAsUser(u:any) {
    if(!confirm("Are you sure you want to login to user account?")) return;

    try {
      const token = await this.appService.getCurrentUserToken();

      const rs = await this.appService.initiateHttpRequest('post', '/admin/user/login', {email: u.email}, token).toPromise();
      if(rs?.status === true) {
        alert("Successfully logged in to user account, click OK to proceed");
        ///signout current user
        await this.appService.auth.signOut();

        //user the token to sign in user
        await this.appService.auth.signInWithCustomToken(rs.data.token);
        const pt = u.type === "Supplier" ? "/supplier" : "/auth";
        this.appService.redirect(pt);
        
      }
      else {
        alert(rs?.message);
      }
    }
    catch(e) {
      alert(e);
    }
  }

}
