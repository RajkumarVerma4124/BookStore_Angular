import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllbooksComponent } from './components/allbooks/allbooks.component';
import { MatSelectModule } from '@angular/material/select';
import { AuthguardServiceService } from './services/authguardServices/authguard-service.service';
import { FilterbookPipe } from './pipe/filterbook.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuickviewComponent } from './components/quickview/quickview.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    PagenotfoundComponent,
    DashboardComponent,
    AllbooksComponent,
    FilterbookPipe,
    QuickviewComponent,
    CartComponent,
    OrderplacedComponent,
    OrderlistComponent,
    WishlistComponent,
    ProfileComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatRadioModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  providers: [AuthguardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
