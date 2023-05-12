import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOverviewResolver } from '../auth/resolvers/account-overview-resolver';
import { OrderResolver } from '../auth/resolvers/order-resolver';
import { ProductDetailResolver } from '../auth/resolvers/product-details-resolver';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DbproductComponent } from './components/dbproduct/dbproduct.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { MessagesComponent } from './components/messages/messages.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SupplierdashboardComponent } from './components/supplierdashboard/supplierdashboard.component';
import { SupplierlandingComponent } from './components/supplierlanding/supplierlanding.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { BankDetailsResolver } from './resolvers/bank-details-resolver';
import { SupplierProducts } from './resolvers/product-details-resolver';
import { SupplierWalletResolver } from './resolvers/wallet-resolver';



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
        },
        {
          path: 'messages',
          component: MessagesComponent
        },
        {
          path: 'wallet',
          component: WalletComponent,
          resolve: {wallet: SupplierWalletResolver, bank: BankDetailsResolver}
        },
        {
          path: 'orders',
          component: OrdersComponent,
          resolve: {orders: OrderResolver}
        },
        {
          path: 'edit/:id',
          component: AddproductComponent,
          resolve: {details: ProductDetailResolver}
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
    SupplierProducts,
    OrderResolver,
    SupplierWalletResolver,
    BankDetailsResolver,
    ProductDetailResolver
  ]
})
export class SupplierRoutingModule {}
