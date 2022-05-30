import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AllbooksComponent } from './components/allbooks/allbooks.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuickviewComponent } from './components/quickview/quickview.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:token', component: ResetpasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/allbooks', pathMatch: 'full' },
      { path: 'allbooks', component: AllbooksComponent, canActivate: [AuthenticationGuard]}, 
      { path: 'quickview/:bookId', component: QuickviewComponent, canActivate: [AuthenticationGuard] },
      { path: 'cart', component: CartComponent, canActivate: [AuthenticationGuard] },
      { path: 'orderplaced', component: OrderplacedComponent, canActivate: [AuthenticationGuard] },
      { path: 'orderlist', component: OrderlistComponent, canActivate: [AuthenticationGuard] },
      { path: 'wishlist', component: WishlistComponent, canActivate: [AuthenticationGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
      { path: 'logout', component: LogoutComponent },
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
