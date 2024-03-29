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
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountstatusComponent } from './components/settings/accountstatus/accountstatus.component';
import { ChangepasswordComponent } from './components/settings/changepassword/changepassword.component';
import { CustomersupportComponent } from './components/settings/customersupport/customersupport.component';
import { NotificationsettingsComponent } from './components/settings/notificationsettings/notificationsettings.component';
import { ProfileComponent } from './components/settings/profile/profile.component';
import { ReviewsComponent } from './components/settings/reviews/reviews.component';



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
    CartComponent,
    DashboardComponent,
    ProductdetailsComponent,
    OrderComponent,
    SettingsComponent,
    AccountstatusComponent,
    ChangepasswordComponent,
    CustomersupportComponent,
    NotificationsettingsComponent,
    ProfileComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
