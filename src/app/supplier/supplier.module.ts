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
    AccountstatusComponent
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
