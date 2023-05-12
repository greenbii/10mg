import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dbproduct',
  templateUrl: './dbproduct.component.html',
  styleUrls: ['./dbproduct.component.css']
})
export class DbproductComponent implements OnInit {

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

    const d:any = this.route.snapshot.data;
    if(d.pd) {
      this.productCards = d.pd;
    }
  }

  async deleteProduct(p: any) {
    try {
      if(!confirm("Are you sure you want to delete this product, note all data and information regarding this product will be lost after this operation")) return;

      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('delete', '/products', {product_id: p.product_id}, token).toPromise();
      if(rs?.status === true) {
        alert(rs.message);
      }
      else {
        throw rs?.message;
      }
    }
    catch(e: any) {
      alert(e.toString());
    }
  }

}
