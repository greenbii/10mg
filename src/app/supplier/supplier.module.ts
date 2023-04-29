import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierRoutingModule } from './supplier-routing-module';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DbSideNavComponent } from './components/db-side-nav/db-side-nav.component';
import { SupplierdashboardComponent } from './components/supplierdashboard/supplierdashboard.component';
import { SupplierlandingComponent } from './components/supplierlanding/supplierlanding.component';
import { DbproductComponent } from './components/dbproduct/dbproduct.component';
import { MiscsModule } from '../miscs/miscs.module';
import { DrugsComponent } from './components/drugs/drugs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/settings/profile/profile.component';
import { ChangepasswordComponent } from './components/settings/changepassword/changepassword.component';
import { NotificationsettingsComponent } from './components/settings/notificationsettings/notificationsettings.component';
import { AccountstatusComponent } from './components/settings/accountstatus/accountstatus.component';
import { ReviewsComponent } from './components/settings/reviews/reviews.component';
import { CustomersupportComponent } from './components/settings/customersupport/customersupport.component';
import { MessagesComponent } from './components/messages/messages.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { OrdersComponent } from './components/orders/orders.component';

import { ProductStatusComponent } from './components/product-status/product-status.component';
import { OrderComponent } from './components/order/order.component';
import { BankupdateComponent } from './components/wallet/bankupdate/bankupdate.component';
import { WithdrawalsComponent } from './components/wallet/withdrawals/withdrawals.component';
//import { ChartModule } from 'angular2-chartjs';



@NgModule({
  declarations: [
    AddproductComponent,
    DbproductComponent,
    DbSideNavComponent,
    SupplierdashboardComponent,
    SupplierlandingComponent,
    DrugsComponent,
    SettingsComponent,
    ProfileComponent,
    ChangepasswordComponent,
    NotificationsettingsComponent,
    AccountstatusComponent,
    ReviewsComponent,
    CustomersupportComponent,
    MessagesComponent,
    WalletComponent,
    OrdersComponent,
    ProductStatusComponent,
    OrderComponent,
    BankupdateComponent,
    WithdrawalsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SupplierRoutingModule,
    MiscsModule
    //ChartModule
  ]
})
export class SupplierModule { }


//FLWPUBK-360db2cc6ffa30f5a23b3ec2ee759918-X
//FLWSECK-e33c917838a75e35142ac1c6f075413a-187c5c6c142vt-X
//e33c917838a72b1e21b14a53