import { NgModule } from '@angular/core';
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
import { AccountOverviewResolver } from './resolvers/account-overview-resolver';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ShopResolver } from './resolvers/shop-resolver';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductDetailResolver } from './resolvers/product-details-resolver';
import { CartComponent } from './components/cart/cart.component';
import { CartResolver } from './resolvers/cart-resolver';


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
        component: ShopScreenComponent,
        resolve: {products: ShopResolver}
      },
      {
        path: 'account',
        component: AccountComponent,
        resolve: {details: AccountOverviewResolver}
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
      /*{
        path: 'products',
        component: DbproductComponent,
      },*/
      {
        path: 'products/:id',
        component: ProductdetailsComponent,
        resolve: {details: ProductDetailResolver}
      },
      // {
      //   path: 'add-products',
      //   component: AddproductComponent
      // },
      {
        path: 'cart',
        component: CartComponent,
        resolve: {cart: CartResolver}
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AccountOverviewResolver,
    ShopResolver,
    ProductDetailResolver,
    CartResolver
  ]
})
export class AuthRoutingModule {}
