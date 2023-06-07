import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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

  is_registering: boolean  = false;
  is_uploading: boolean = false;

  licenceFile!: File;
  cacFile!: File;

  supRegForm: FormGroup = new FormGroup({
    licence_number: new FormControl(null, [Validators.required]),
    expiry_date: new FormControl(null, [Validators.required])
  })

  licenses: any[] = [];

  business: any = null;

  constructor(private appService: AppService, private fStorage: AngularFireStorage) { }

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

  async submitRegistration() {
    try {
      this.is_registering = true;
      //upload the documents, if thats successful

      //handle upload
      const uFiles = await this.uploadFiles()
      const dt =  {...this.supRegForm.value}
      const token = await this.appService.getCurrentUserToken();
      const resp = await this.appService.initiateHttpRequest('post', '/licence', {...dt, cac: null, licence: uFiles.licence}, token).toPromise();
      if(resp?.status !== true) {
        alert(resp?.message);
        this.is_registering = false;
        return;
      }

      //finish up here
      this.is_registering = false;
      //return true;
      document.getElementById("close-dialog-btn")?.click();
      this.licenses.push(resp.data);
      this.supRegForm.reset();
      
    }
    catch {
      this.is_registering = false;
      //return false;
    }
  }

  async uploadFiles() {
    try {
      if(!this.licenceFile) throw "You must select and operating Licence file to proceed";

      this.is_uploading = true;
      const random = Math.random().toString().split(".")[1];
      //const ext1 = this.cacFile.name.toLowerCase().split(".").pop();
      const ext2 = this.licenceFile.name.toLowerCase().split(".").pop();


      const ee = await Promise.all([
        //this.fStorage.upload("/documents/"+"cac_"+random+"."+ext1, this.cacFile).then(async a=>{
          //return await a.ref.getDownloadURL()
        //}),
        this.fStorage.upload("/documents/"+"licence_"+random+"."+ext2, this.licenceFile).then(async a=>{
          return await a.ref.getDownloadURL()
        })
      ]
      )
      this.is_uploading = false;
      //return {cac: ee[0], licence: ee[1]}
      return {cac: null, licence: ee[0]}
    }
    catch(ee) {
      this.is_uploading = false;
      throw ee;
    }
  }

}
