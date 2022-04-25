import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr'
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  constructor(private proserv:ProductService,private cartserv:CartService,private actr:ActivatedRoute,private toastr: ToastrService,private router:Router,private title:Title) { }
  pid:any;
  product:any;
  quancount:number = 1;

  ngOnInit(): void {
    this.title.setTitle('Products');

    this.pid = this.actr.snapshot.params['id'];
    this.proserv.product(this.pid).subscribe((res:any)=>{
        if(res.status == 200){
          this.product = res.body.product;
          this.title.setTitle('Pizza order | '+ this.product.name);
        }
    },(error:any)=>{
      console.log(error);
      if((error.status == 404) || (error.error)){
        // console.log(error.error.message);
        alert(error.error.message);
        this.toastr.error( error.error.message,"Error!");
      }
    })
    
  }

  addtocart(){
    let data = { product_id:this.pid,quantity:this.quancount};
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
