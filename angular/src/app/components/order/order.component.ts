import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderserv:OrderService,private router:Router,private title:Title) { }
  orderList:any;

  ngOnInit(): void {

    this.title.setTitle('My Orders');

    this.orderserv.index().subscribe((res:any)=>{
      if(res.status == 200){
        this.orderList = res.body.order_products;
      }
    },(error:any)=>{
      if(error.status == 401){
        this.router.navigateByUrl('/login');
      }
    })
  }

}
