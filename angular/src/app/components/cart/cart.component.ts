import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartserv:CartService,private router:Router,private title:Title,private toastr:ToastrService) { }
  cartList:any;
  cartTotalAmount:any = 0;
  subscription: Subscription = this.cartTotalAmount;

  ngOnInit(): void {
    this.getCartItems();
    this.subscription = this.cartserv.currentcheckoutTotal.subscribe(totamount => this.cartTotalAmount = totamount);

    this.title.setTitle('Pizza Order | Cart');
  }

  getCartItems(){
    this.cartserv.index().subscribe((res:any)=>{
      if(res.status == 200){
        this.cartList = res.body.cart_items;
        this.cartListCalculate();
      }
    },(error:any)=>{
      if(error.status == 401){
        this.router.navigateByUrl('/login');
      }
    })
  }

  cartListCalculate(){
    /** for dynamic cart count */
    let cartitemcount = 0;
    this.cartTotalAmount = 0;
    if(this.cartList.length > 0){
      cartitemcount =  this.cartList.reduce(function(acc:any, item:any) {
        return acc + item.cartQuantity;
      }, 0);

      this.cartTotalAmount =  this.cartList.reduce(function(acc:any, item:any) {
        return acc + (item.price * item.cartQuantity);
      }, 0);
      this.cartTotalAmount = parseFloat(this.cartTotalAmount).toFixed(2);
    }
    this.cartserv.setCount(cartitemcount);
    /** end dynamic cart count */
  }

  delete(cid:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartserv.delete(cid).subscribe((res:any)=>{
          if(res.status == 200){
            Swal.fire({
              position: 'center',icon: 'success',title: 'Your cart item has been deleted.',showConfirmButton: false,timer: 1500
            });
            // this.toastr.success( res.body.message,"Success!");
            this.getCartItems();
          }
        },(error:any)=>{
          if(error.status == 401){
            this.router.navigateByUrl('/login');
          }
        })
      }
    })

    
  }
/** increment the cart quantity */
  increment(cart:any){
    if(cart.cartQuantity < (cart.cartQuantity + cart.quantity)){
      cart.cartQuantity++;
      this.update(cart);
    }else{
      this.toastr.error( 'Cart item can\'t be increment',"Error!");
    }
    
  }

/** decrement the cart quantity */
  decrement(cart:any){
    if(cart.cartQuantity > 1){
      cart.cartQuantity--;
      this.update(cart);
    }else{
      this.toastr.error( 'Cart item can\'t be decrement',"Error!");
    }
  }



/** update the cart quantity */
update(cart:any){
    let cid = cart.cartId;
    let data = {quantity:cart.cartQuantity};
    this.cartserv.update(cid,data).subscribe((res:any)=>{
      if(res.status == 200){
        this.toastr.success( res.body.message,"Success!");
        this.cartListCalculate();
      }
    },(error:any)=>{
      if(error.status == 401){
        this.router.navigateByUrl('/login');
      }
      if(error.error.message){
        this.toastr.error( error.error.message,"Error!");
      }
    })
  }

  checkout(){
    /** rxJS subscription and BehaviorSubject for pass data between non relational components */
    let cart_ids = this.cartList.map((a:any) => a.cartId);

    let checkoutData = {cartTotalAmount:this.cartTotalAmount,cart_ids:cart_ids};
    this.cartserv.setCheckoutTotal(checkoutData);
    this.router.navigateByUrl('/checkout');
  }

}
