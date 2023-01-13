import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AboutComponent } from './components/aboutComponent/about/about.component';
import { BecomeSupplierLandingComponent } from './components/becomeSupplier/become-supplier-landing/become-supplier-landing.component';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';
import { HelpFaqComponent } from './components/FAQ/help-faq/help-faq.component';
// import { BecomeSupplierComponent } from './components/landingComponent/become-supplier/become-supplier.component';
import { LandingComponent } from './components/landingComponent/landing/landing.component';
import { PrivacyPolicyComponent } from './components/privacyPolicy/privacy-policy/privacy-policy.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TermsandconditionComponent } from './components/terms/termsandcondition/termsandcondition.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'auth',
    loadChildren: ()=>import('./auth/auth.module').then(a=> a.AuthModule)
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'become-supplier',
    component: BecomeSupplierLandingComponent
  },
  {
    path: 'faq',
    component: HelpFaqComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: "terms-and-condition",
    component: TermsandconditionComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }, 
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'registrations',
    component: RegistrationsComponent
  },
  {
    path: '**',
    component: ComingsoonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AppRoutingModule { }
