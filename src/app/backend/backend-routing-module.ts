import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderLogResolver } from '../auth/resolvers/log-history-resolver';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DbproductComponent } from './components/dbproduct/dbproduct.component';
import { LandingComponent } from './components/landing/landing.component';
import { OrdersComponent } from './components/orders/orders.component';
import { TrackProductComponent } from './components/track-product/track-product.component';
import { UsersComponent } from './components/users/users.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { DashboardSummaryResolver } from './resolvers/dashboard-summary';
import { AdminOrdersResolver } from './resolvers/order-resolver';
import { AdminWalletResolver } from './resolvers/wallet-resolver';





const routes: Routes = [
    {
      path: '',
      component: LandingComponent,
      children: [
        {
          path: '',
          component: DashboardComponent,
          resolve: {summary: DashboardSummaryResolver}
        },
        {
          path: 'orders',
          component: OrdersComponent,
          resolve: {orders: AdminOrdersResolver}
        },
        {
          path: 'users',
          component: UsersComponent
        },
        {
          path: 'products',
          component: DbproductComponent
        },
        {
          path: 'add-products',
          component: AddproductComponent
        },
        {
          path: 'wallet',
          component: WalletComponent,
          resolve: {wallet: AdminWalletResolver}
        },
        {
          path: 'track-order/:id',
          component: TrackProductComponent,
          resolve: {log: OrderLogResolver}
        }
      ]
    }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AdminWalletResolver,
    AdminOrdersResolver,
    DashboardSummaryResolver,
    OrderLogResolver
  ]
})
export class BackendRoutingModule {}
