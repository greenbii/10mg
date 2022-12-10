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
import { TestimonialsComponent } from './components/aboutComponent/testimonials/testimonials.component';
import { SwiperModule } from 'swiper/angular';
import { BecomeSupplierLandingComponent } from './components/becomeSupplier/become-supplier-landing/become-supplier-landing.component';
import { HelpFaqComponent } from './components/FAQ/help-faq/help-faq.component';
import { PrivacyPolicyComponent } from './components/privacyPolicy/privacy-policy/privacy-policy.component';
import { TermsandconditionComponent } from './components/terms/termsandcondition/termsandcondition.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';

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
    AboutComponent,
    TestimonialsComponent,
    BecomeSupplierLandingComponent,
    HelpFaqComponent,
    PrivacyPolicyComponent,
    TermsandconditionComponent,
    SignupComponent,
    SigninComponent,
    ComingsoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
