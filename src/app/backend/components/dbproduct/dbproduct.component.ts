import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dbproduct',
  templateUrl: './dbproduct.component.html',
  styleUrls: ['./dbproduct.component.css']
})
export class DbproductComponent implements OnInit {

  is_loading: boolean = false;

  productCards: any = [
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
    {
      status: 'Available',
      name: 'Pentazocine',
      price: '200'
    },
  ]
  

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.productCards = [];

    this.loadProducts();
  }

  filterProducts(type: string) {

  }

  async loadProducts() {
    try {
      this.is_loading = true;
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest("get", "/admin/products", undefined, token).toPromise();
      if(rs?.status === true) {
        this.productCards = rs.data;
      }
      else {
        throw rs?.message;
      }

      this.is_loading = false;
    }
    catch(e: any) {
      alert(e.toString());
      this.is_loading = false;
    }
  }

}
