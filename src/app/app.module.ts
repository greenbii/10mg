import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { LandingComponent } from './components/landing/landing.component';
import { TrustedclientsComponent } from './components/trustedclients/trustedclients.component';
import { BtnCompComponent } from './components/btn-comp/btn-comp.component';
import { BecomeSupplierComponent } from './components/become-supplier/become-supplier.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    LandingComponent,
    TrustedclientsComponent,
    BtnCompComponent,
    BecomeSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
