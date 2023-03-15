import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-customersupport',
  templateUrl: './customersupport.component.html',
  styleUrls: ['./customersupport.component.css']
})
export class CustomersupportComponent implements OnInit {

  is_operation_in_progress: boolean = false;

  uForm = new FormGroup({
    subject: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required])
  })

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  async sendSupportTicket() {
    //check the ticket and se
    this.is_operation_in_progress = true;
    try {
      const token = await this.appService.getCurrentUserToken();
      const resp = await this.appService.initiateHttpRequest('get', '/support-ticket', {...this.uForm.value}, token).toPromise();
      if(resp?.status === true) {
        alert("You have successfully submit a support ticket, our support represetative will respond to your request within 24hr");
        this.uForm.reset();
      }
      else {
        alert(resp?.message);
      }
      this.is_operation_in_progress = false;
    }
    catch(e: any) {
      alert(e.toString());
      this.is_operation_in_progress = false
    }
  }

}
