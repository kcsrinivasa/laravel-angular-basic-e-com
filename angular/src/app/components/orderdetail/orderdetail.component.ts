import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  constructor(private orderserv:OrderService,private actr:ActivatedRoute,private router:Router,private title:Title) { }
  order_id:any;
  order:any;
  address:any;
  productList:any;

  ngOnInit(): void {

    this.title.setTitle('Order details');

    this.order_id = this.actr.snapshot.params['id'];
    this.orderserv.show(this.order_id).subscribe((res:any)=>{
      // console.log(res);
      if(res.status == 200){
        this.order = res.body.order;
        this.address = res.body.address;
        this.productList = res.body.order_products;
      }
    },(error:any)=>{
      if(error.status == 401){
        this.router.navigateByUrl('/login');
      }
    })


  }

}
