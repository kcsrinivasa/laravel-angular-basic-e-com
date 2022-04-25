import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private proserv:ProductService,private cartserv:CartService,private router:Router, private title:Title,private toastr:ToastrService) { }
  productList:any;
  ngOnInit(): void {

    this.title.setTitle('Pizza order | Products');

    this.getProducts();
  }


  getProducts(){
    this.proserv.products().subscribe((res:any)=>{
      // console.log(res);
      if(res.status == 200){
        this.productList = res.body.products;
      }
    },(error:any)=>{
      console.log(error);
    })
  }

  addtocart(pid:any){
    let data = { product_id:pid,quantity:1};
        // console.log(data);
      this.cartserv.store(data).subscribe((res:any)=>{
        if(res.status == 200){
          this.toastr.success( res.body.message,"Success!");
          this.router.navigateByUrl('/cart');
        }
          if(res.status == 201){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.body.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigateByUrl('/cart');
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

  }

}
