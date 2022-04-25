import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authserv:AuthService,private router:Router, private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pizza order');
    if(this.authserv.isLoggedIn()){
      this.router.navigateByUrl('/products');
    }
  }

}
