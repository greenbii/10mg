import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOverviewResolver } from '../auth/resolvers/account-overview-resolver';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DbproductComponent } from './components/dbproduct/dbproduct.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SupplierdashboardComponent } from './components/supplierdashboard/supplierdashboard.component';
import { SupplierlandingComponent } from './components/supplierlanding/supplierlanding.component';
import { SupplierProducts } from './resolvers/product-details-resolver';



const routes: Routes = [
    {
      path: '',
      component: SupplierlandingComponent,
      children: [
        {
          path: '',
          component: SupplierdashboardComponent,
          resolve: {details: AccountOverviewResolver}
        },
        {
          path: 'products',
          component: DbproductComponent,
          resolve: {pd: SupplierProducts}
        },
        {
          path: 'add-products',
          component: AddproductComponent
        },
        {
          path: 'add-drugs',
          component: DrugsComponent
        },
        {
          path: 'settings',
          component: SettingsComponent
        }
      ]
    }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AccountOverviewResolver,
    SupplierProducts
  ]
})
export class SupplierRoutingModule {}
