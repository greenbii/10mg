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
    TrackProductComponent
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
