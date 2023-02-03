import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DbproductComponent } from './components/dbproduct/dbproduct.component';
import { SupplierdashboardComponent } from './components/supplierdashboard/supplierdashboard.component';
import { SupplierlandingComponent } from './components/supplierlanding/supplierlanding.component';



const routes: Routes = [
    {
      path: '',
      component: SupplierlandingComponent,
      children: [
        {
          path: '',
          component: SupplierdashboardComponent
        },
        {
          path: 'products',
          component: DbproductComponent
        },
        {
          path: 'add-products',
          component: AddproductComponent
        }
      ]
    }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class SupplierRoutingModule {}
