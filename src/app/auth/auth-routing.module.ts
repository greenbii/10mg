import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthlandingComponent } from './components/authlanding/authlanding.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopScreenComponent } from './components/shop-screen/shop-screen.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductStatusComponent } from './components/product-status/product-status.component';
import { TrackProductComponent } from './components/track-product/track-product.component';
import { ProductStatusCompletedComponent } from './components/product-status-completed/product-status-completed.component';
import { ProductStatusCancelledComponent } from './components/product-status-cancelled/product-status-cancelled.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DbproductComponent } from './components/dbproduct/dbproduct.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';

const routes: Routes = [
  {
    path: '',
    component: AuthlandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'shop',
        pathMatch: 'full',
      },
      {
        path:'shop',
        component: ShopScreenComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'product-status',
        component: ProductStatusComponent
      },
      {
        path: 'track-order',
        component: TrackProductComponent
      },
      {
        path: 'product-status-completed',
        component: ProductStatusCompletedComponent,
      },
      {
        path: 'product-status-cancelled',
        component: ProductStatusCancelledComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: DbproductComponent,
      },
      {
        path: 'add-products',
        component: AddproductComponent
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
