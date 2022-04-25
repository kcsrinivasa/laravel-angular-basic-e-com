import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './components/cart/cart.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';
import { OrderdetailComponent } from './components/orderdetail/orderdetail.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    WelcomeComponent,
    CartComponent,
    ProductdetailComponent,
    CheckoutComponent,
    OrderComponent,
    OrderdetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
