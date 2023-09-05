import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AccountOverviewResolver } from './auth/resolvers/account-overview-resolver';
import { BackendGuard } from './backend/backend.guard';
import { AboutComponent } from './components/aboutComponent/about/about.component';
import { BecomeSupplierLandingComponent } from './components/becomeSupplier/become-supplier-landing/become-supplier-landing.component';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';
import { HelpFaqComponent } from './components/FAQ/help-faq/help-faq.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
// import { BecomeSupplierComponent } from './components/landingComponent/become-supplier/become-supplier.component';
import { LandingComponent } from './components/landingComponent/landing/landing.component';
import { PrivacyPolicyComponent } from './components/privacyPolicy/privacy-policy/privacy-policy.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TermsandconditionComponent } from './components/terms/termsandcondition/termsandcondition.component';
import { SubmitreviewComponent } from './components/submitreview/submitreview.component';
import { ShopResolver } from './auth/resolvers/shop-resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: ()=>import('./auth/auth.module').then(a=> a.AuthModule),
    canActivate: [AuthGuard],
    resolve: {u: AccountOverviewResolver, pp: ShopResolver}
  },
  {
    path: 'supplier',
    loadChildren: ()=>import('./supplier/supplier.module').then(a=> a.SupplierModule),
    canActivate: [AuthGuard],
    resolve: {u: AccountOverviewResolver}
  },
  {
    path: 'backend',
    loadChildren: ()=>import('./backend/backend.module').then(a=> a.BackendModule),
    canActivate: [BackendGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'submit-review',
    component: SubmitreviewComponent
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
    component: RegistrationsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: '**',
    component: ComingsoonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard, AuthGuard, AccountOverviewResolver, ShopResolver]
})
export class AppRoutingModule { }
