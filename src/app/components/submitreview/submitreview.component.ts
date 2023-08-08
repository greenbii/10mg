import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-submitreview',
  templateUrl: './submitreview.component.html',
  styleUrls: ['./submitreview.component.css']
})
export class SubmitreviewComponent implements OnInit {

  rForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    name: new FormControl(null, Validators.required),
    designation: new FormControl(null, Validators.required),
    review: new FormControl(null, Validators.required),
    location: new FormControl(null)
  })

  is_operation_in_progress: boolean = false;

  image_data: any = "";

  is_success: boolean = false;
  is_error: boolean = false;
  error_message: any = null;

  hover_review_index = 0;
  selected_rating = 0;

  stars: number[] = [1,2,3,4,5];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  submitReview() {
    if(this.rForm.valid) {
      //send the requet to the server
      this.is_operation_in_progress = true;
      this.appService.initiateHttpRequest('post', '/submit-site-review', {...this.rForm.value, rating: this.selected_rating, image: this.image_data}).subscribe(response=>{
        this.is_operation_in_progress = false;
        if(response.status === true) {
          this.rForm.reset();
          this.is_success = true;
          this.selected_rating = 0;
          this.image_data = "";
        }
        else {
          this.is_error = true;
          this.error_message = response.message;
        }

        setTimeout(()=>{
          this.is_success = false;
          this.is_error = false;
          this.error_message = null;
        }, 10000)
      }, (e)=>{
        this.error_message = e.message;
        this.is_error = true;
        this.is_operation_in_progress = false;

        setTimeout(()=>{
          this.is_success = false;
          this.is_error = false;
          this.error_message = null;
        }, 10000)
      })

    }
  }

  handleSelection($event: any) {
    const fl = $event.srcElement
    //console.log(fl.files);
    if(fl.files.length !== 0) {
    const reader = new FileReader;
    const file: File = fl.files[0] as File;
    reader.onloadend = (ff)=>{
      this.image_data = reader.result;
    }
    reader.readAsDataURL(file);
    
    //if($event.FilesList)
    }
  }

}
