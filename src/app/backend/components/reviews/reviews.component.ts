import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  is_loading: boolean = false;

  constructor(private appService: AppService) { }

  reviews: any[] = [];
  stars: number[] = [1,2,3,4,5];

  ngOnInit(): void {
    this.loadReviews();
  }

  approveReview(id: number, status: string) {
    //this.is_loading = true;
    if(!confirm("Are you sure you want to "+status+" this review?")) return;
    this.appService.getCurrentUserToken().then(async (token)=>{
      try {
        const rs = await this.appService.initiateHttpRequest('post', '/admin/reviews', {review_id: id, status: status} , token).toPromise();
        if(rs?.status === true) {
          const rv = this.reviews.findIndex((ff)=> ff.id === id);
          if(rv !== -1) {
            this.reviews[rv].approval_status = status;
          }
        }
        else {
          alert(rs?.message);
        }
        this.is_loading = false;
      }
      catch(e){
        this.is_loading = false;
      }
    },
    (e)=>{
      console.log(e);
      this.is_loading = false;
    })
  }

  deleteReview(id: number){
    if(!confirm("Are you sure you want to Delete this review?")) return;
    this.appService.getCurrentUserToken().then(async (token)=>{
      try {
        const rs = await this.appService.initiateHttpRequest('delete', '/admin/reviews/'+id, undefined , token).toPromise();
        if(rs?.status === true) {
          const rv = this.reviews.findIndex((ff)=> ff.id === id);
          if(rv !== -1) {
            this.reviews.splice(rv, 1);
          }
        }
        else {
          alert(rs?.message);
        }
        this.is_loading = false;
      }
      catch(e){
        this.is_loading = false;
      }
    },
    (e)=>{
      console.log(e);
      this.is_loading = false;
    })
  }

  loadReviews() {
    this.is_loading = true;
    this.appService.getCurrentUserToken().then(async (token)=>{
      try {
        const rs = await this.appService.initiateHttpRequest('get', '/admin/reviews', undefined, token).toPromise();
        if(rs?.status === true) {
          this.reviews = rs?.data;
        }
        else {
          alert(rs?.message);
        }
        this.is_loading = false;
      }
      catch(e){
        this.is_loading = false;
      }
    },
    (e)=>{
      console.log(e);
      this.is_loading = false;
    })
  }
}
