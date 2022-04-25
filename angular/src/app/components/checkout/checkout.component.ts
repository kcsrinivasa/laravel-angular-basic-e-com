import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartserv:CartService,private orderserv:OrderService,private addserv:AddressService,private fb:FormBuilder,private router:Router, private title:Title,private toastr:ToastrService) { }
  
  cartTotalAmount:any = 0;
  cart_ids:any;
  subscription: Subscription = this.cartTotalAmount;
  creditcard:any;
  addressList:any;
  selectedAddressId:any = '';
  formGaddress = new FormGroup({});
  newAddDiv: boolean = false;



  ngOnInit(): void {
    /** dynamic checkout total using rxjs subject */
    
    this.subscription = this.cartserv.currentcheckoutTotal.subscribe((res:any) =>{
       this.cartTotalAmount = res.cartTotalAmount;
       this.cart_ids = res.cart_ids;
    });

    if(!this.cartTotalAmount){ this.router.navigateByUrl('/cart'); }

    this.title.setTitle('Pizza Order | Checkout');
    this.addressValidationfb();
    this.getAddresses();

  }

  placeorder(){
    let data = { amount:this.cartTotalAmount,cart_ids:this.cart_ids,address_id:this.selectedAddressId,carddetails:this.creditcard};
    // console.log(data);

    this.orderserv.store(data).subscribe((res:any)=>{
        if(res.status == 201){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.body.message,
            showConfirmButton: false,
            timer: 5000
          });
          this.cartserv.setCount(0); /** reset nav cart count */
          this.router.navigateByUrl(`/order/${res.body.order.id}/details`);
        }
    },(error:any)=>{
      console.log(error);
      if((error.status == 404) ||(error.status == 422) || (error.error)){
        if(error.error.message){
          this.toastr.error(error.error.message,"Error!");
        }
        // console.log(error.error.errors);
        if(error.error.errors){
          // console.log('errors');
          let errors = error.error.errors;
          for(let err of Object.values(errors)){
            let errmsggroup:any = err;
            for(let errmsg of errmsggroup){
             this.toastr.error(errmsg,"Error!");
            }
          }
        }
      }
    })

  } //end place order

  /** for address  */

  /** address validation */
  addressValidationfb(){
    this.formGaddress = this.fb.group({
      name:['',[Validators.required]],
      phone:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      city:['',[Validators.required]],
      landmark:['',[Validators.required]],
      street:['',[Validators.required]],
      state:['',[Validators.required]],
      zipcode:['',[Validators.required]],
    })
  }
  get avform(){
    return this.formGaddress.controls;
  }

  getAddresses(){
    this.addserv.index().subscribe((res:any)=>{
      if(res.status == 200){
        this.addressList = res.body.address_list;
      }
    },(error:any)=>{
      if(error.status == 401){
        this.router.navigateByUrl('/login');
      }
    })
  }


  storeAddress(){
    let addData = this.formGaddress.getRawValue();
        // console.log(data);
    if(this.formGaddress.valid){
      this.addserv.store(addData).subscribe((res:any)=>{
        // console.log(res);
        console.log(res.body.address.id);
          if(res.status == 201){
            this.toastr.success(res.body.message,"Success!");
            this.getAddresses();
            this.selectedAddressId = res.body.address.id;
            this.formGaddress.reset(); //reset form
            this.newAddDiv = false;
          }
      },(error:any)=>{
        console.log(error);
        if((error.status == 422) || (error.error)){
          if(error.error.message){
            this.toastr.error(error.error.message,"Error!");
          }
          // console.log(error.error.errors);
          if(error.error.errors){
            // console.log('errors');
            let errors = error.error.errors;
            for(let err of Object.values(errors)){
              let errmsggroup:any = err;
              for(let errmsg of errmsggroup){
              this.toastr.error(errmsg,"Error!");
              }
            }
          }
        }
      })
  } //store addres

  } //end store address

}
