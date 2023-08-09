import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.component.html',
  styleUrls: ['./product-status.component.css']
})
export class ProductStatusComponent implements OnInit {

  @Input() order: any = null;

  is_operation_in_progress: boolean = false;

  //affected_product: any = null;

  cForm = new FormGroup({
    action: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    tracking_id: new FormControl(null),
    affected_product: new FormControl(null)
  })

  current_action: string | null = null;

  actions: any[] = ["paid", "shipped", "processing", "notified supplier", "trasit", "delivered", "other"]

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  async updateOrderStatus() {
    try {
      this.is_operation_in_progress = true;
      const token = await this.appService.getCurrentUserToken();
      if(this.cForm.value.affected_product !== null) {
        const dss: any = "["+(this.cForm.value.affected_product || "")+"]\n"+this.cForm.value.description;
        this.cForm.patchValue({description: dss})
      }
      const response = await this.appService.initiateHttpRequest('post', '/admin/update-order-status', {order_id: this.order.order_id, ...this.cForm.value}, token).toPromise();
      if(response?.status === true){
        document.getElementById("close-modal")?.click();
        alert(response.message);
        this.cForm.reset();
      }
      else {
        throw response?.message;
      }
      this.is_operation_in_progress = false;
    }
    catch(e: any) {
      alert(e.toString());
      this.is_operation_in_progress = false;
    }
  }

  handleStatusChange() {
    this.current_action = this.cForm.value.action || null;
  }

}
