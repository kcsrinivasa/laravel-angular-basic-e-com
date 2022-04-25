import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authserv:AuthService,private router:Router, private cartserv:CartService) { }
  isLoggedIn:boolean = false;
  cartcount=0;

  ngOnInit(): void {

      /** check user already logged in */
    if(localStorage.getItem('_token') != undefined){
      if(localStorage.getItem('isLoggedIn') == 'true'){
        this.isLoggedIn = true;
      }
    }else{
      this.isLoggedIn = false;
    }

    /** dynamic nav bar using rxjs subject */
    this.authserv.getSubjectNav().subscribe(data=>{

      if(data.isLoggedIn){ this.isLoggedIn = data.isLoggedIn; }

      if(data.isLoggedIn === false){ this.isLoggedIn = data.isLoggedIn; }
    })


    /** for dynamic cart count */

    this.cartserv.index().subscribe((res:any)=>{

      if(res.status == 200){
        let cartItems = res.body.cart_items;
        if(cartItems.length > 0){
          this.cartcount =  cartItems.reduce(function(acc:any, item:any) {
            return acc + item.cartQuantity;
          }, 0);
          // this.cartcount = cartItems.length;
        }
      }
    },(error:any)=>{
      if(error.status == 401){
        this.router.navigateByUrl('/login');
      }
    })

    /** dynamic cart count using rxjs subject */
    this.cartserv.getCount().subscribe(res=>{
      this.cartcount = res;
    })


  } /** end ngOnInit */


  logout(){
    Swal.fire({
      title: 'Are you sure do you want to logout?',
      // text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, stay in'
    }).then((result:any) => {
      if (result.value) {
          this.authserv.logout();
          this.router.navigate(['/']);
      }
    })

    // if(confirm('Are you sure do you want to logout?')){
    //   this.authserv.logout();
    // }
  }

}
