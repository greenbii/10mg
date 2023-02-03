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



@NgModule({
  declarations: [
    AddproductComponent,
    DbproductComponent,
    DbSideNavComponent,
    SupplierdashboardComponent,
    SupplierlandingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SupplierRoutingModule,
    MiscsModule
  ]
})
export class SupplierModule { }
