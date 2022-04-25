import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { OrderdetailComponent } from './components/orderdetail/orderdetail.component';
import { ProductComponent } from './components/product/product.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'products',component:ProductComponent},
  {path:'products/:id/details',component:ProductdetailComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'order',component:OrderComponent},
  {path:'order/:id/details',component:OrderdetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
