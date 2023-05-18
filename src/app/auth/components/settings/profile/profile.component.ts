import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  profile: any = {
    name: "Nordic Normal",
    
  }

  licenceFile!: File;
  cacFile!: File;

  supRegForm: FormGroup = new FormGroup({
    licence_number: new FormControl(null, [Validators.required]),
    expiry_date: new FormControl(null, [Validators.required])
  })

  licenses: any[] = [];

  business: any = null;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    //console.log(this.appService.current_business_details);

    this.business = this.appService.current_business_details.business;

    this.loadLicenses();
  }

  async loadLicenses() {
    try {
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest("get", "/licence", undefined, token).toPromise();
      if(rs?.status === true) {
        this.licenses = rs.data;
      }
      else {
        throw rs?.message;
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  async removeLicence(id: number, index: number) {
    if(!confirm("Are you sure you want to remove this licence record?")) return;

    try {
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest("delete", "/licence", {licence_id: id}, token).toPromise();
      if(rs?.status === true) {
        this.licenses.splice(index, 1);
      }
      else {
        throw rs?.message;
      }
    }
    catch(e: any) {
      alert(e.toString());
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

}
