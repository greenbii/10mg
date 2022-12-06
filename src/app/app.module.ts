import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/landingComponent/navbar/navbar.component';
import { FooterComponent } from './components/landingComponent/footer/footer.component';
import { HeroComponent } from './components/landingComponent/hero/hero.component';
import { LandingComponent } from './components/landingComponent/landing/landing.component';
import { TrustedclientsComponent } from './components/landingComponent/trustedclients/trustedclients.component';
import { BtnCompComponent } from './components/landingComponent/btn-comp/btn-comp.component';
import { BecomeSupplierComponent } from './components/landingComponent/become-supplier/become-supplier.component';
import { AboutHeroComponent } from './components/aboutComponent/about-hero/about-hero.component';
import { AboutComponent } from './components/aboutComponent/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    LandingComponent,
    TrustedclientsComponent,
    BtnCompComponent,
    BecomeSupplierComponent,
    AboutHeroComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
