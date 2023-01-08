import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthlandingComponent } from './components/authlanding/authlanding.component';
import { ShopScreenComponent } from './components/shop-screen/shop-screen.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ShopTopNavComponent } from './components/shop-top-nav/shop-top-nav.component';
import { ProductsComponent } from './components/products/products.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductStatusComponent } from './components/product-status/product-status.component';
import { TrackProductComponent } from './components/track-product/track-product.component';
import { ProductStatusCompletedComponent } from './components/product-status-completed/product-status-completed.component';
import { ProductStatusCancelledComponent } from './components/product-status-cancelled/product-status-cancelled.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';



@NgModule({
  declarations: [
    AuthlandingComponent,
    ShopScreenComponent,
    ShopTopNavComponent,
    ProductsComponent,
    AccountComponent,
    OrdersComponent,
    ProductStatusComponent,
    TrackProductComponent,
    ProductStatusCompletedComponent,
    ProductStatusCancelledComponent,
    WishlistComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
