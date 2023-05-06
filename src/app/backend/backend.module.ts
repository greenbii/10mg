import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { BackendRoutingModule } from './backend-routing-module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { DbproductComponent } from './components/dbproduct/dbproduct.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { MiscsModule } from '../miscs/miscs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalletComponent } from './components/wallet/wallet.component';
import { WithdrawalsComponent } from './components/wallet/withdrawals/withdrawals.component';
import { ProductStatusComponent } from './components/product-status/product-status.component';
import { TrackProductComponent } from './components/track-product/track-product.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/settings/profile/profile.component';
import { ChangepasswordComponent } from './components/settings/changepassword/changepassword.component';
import { NotificationsettingsComponent } from './components/settings/notificationsettings/notificationsettings.component';
import { ReviewsComponent } from './components/settings/reviews/reviews.component';
import { CustomersupportComponent } from './components/settings/customersupport/customersupport.component';
import { AccountstatusComponent } from './components/settings/accountstatus/accountstatus.component';
import { MessagesComponent } from './components/messages/messages.component';



@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    OrdersComponent,
    UsersComponent,
    DbproductComponent,
    AddproductComponent,
    WalletComponent,
    WithdrawalsComponent,
    ProductStatusComponent,
    TrackProductComponent,
    SettingsComponent,
    ProfileComponent,
    ChangepasswordComponent,
    NotificationsettingsComponent,
    ReviewsComponent,
    CustomersupportComponent,
    AccountstatusComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackendRoutingModule,
    MiscsModule
  ]
})
export class BackendModule { }
