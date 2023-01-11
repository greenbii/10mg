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

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn9BUzzZu1gGAUtHIBh6JG4sPJ81kp61g",
  authDomain: "mg-cbc21.firebaseapp.com",
  projectId: "mg-cbc21",
  storageBucket: "mg-cbc21.appspot.com",
  messagingSenderId: "507588601673",
  appId: "1:507588601673:web:af709ac803984bacfbdc98",
  measurementId: "G-86W5RJG89H"
};

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
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
