import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formG = new FormGroup({});
  errMsg:any;
  redirectURL:any;
  constructor(private fb:FormBuilder,private authserv:AuthService,private router:Router,private actr:ActivatedRoute,private toastr: ToastrService,private title:Title) {
    this.title.setTitle('Login');
   }

  ngOnInit(): void {

    this.formG = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    });

    /** check redirect url is set */
    this.redirectURL = this.actr.snapshot.queryParams['returnURL'] || '/products';
    // console.log(this.actr.snapshot.queryParams['returnURL']);

  }

  get vform(){
    return this.formG.controls;
  }

  postLogin(){
    let data = { email:this.formG.value.email,password:this.formG.value.password};
    // console.log(data);
    if(this.formG.valid){
      this.authserv.login(data).subscribe((res:any)=>{
        // console.log(res.status);
        if(res.status == 200){
          // console.log('user logged successfully');
          let token = res.body.token_type + ' ' + res.body.token;
          localStorage.setItem('_token',token);
          /** redirect */
          this.authserv.isLoggedIn();
          this.toastr.success( "Successfully logged in","Success!")

          this.router.navigateByUrl(this.redirectURL);
        }else{
          this.errMsg = res.msg;
        }
      },(error:any)=>{
          // console.log(error.status);
          if((error.status == 404) || (error.error)){
            // console.log(error.error.message);
            // alert(error.error.message);
            this.toastr.error( error.error.message,"Error!")
          }
          
      })
    }

  }

}
