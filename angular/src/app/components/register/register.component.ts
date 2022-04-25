import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import Validation from 'src/app/custom/validation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formG =  new FormGroup({});

  constructor(private fb:FormBuilder,private authserv:AuthService,private router:Router,private title:Title) {
    this.title.setTitle('Register');
   }

  ngOnInit(): void {
    this.formG = this.fb.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
      email:['',[Validators.required,Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
      cnfpassword:['',[Validators.required]],
      phone:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address:['',[Validators.required]],
    },{
      validators:[Validation.match('password','cnfpassword')]
    });
  }

  get vform(){
    return this.formG.controls;
  }

  postRegister(){
    let data = { name:this.formG.value.name,phone:this.formG.value.phone,email:this.formG.value.email,address:this.formG.value.address,password:this.formG.value.password,password_confirmation:this.formG.value.cnfpassword};
    console.log(data);
    if(this.formG.valid){
      this.authserv.register(data).subscribe((res:any)=>{
        // console.log(res.status);
        if(res.status == 201){
          // console.log('user logged successfully');
          let token = res.body.token_type + ' ' + res.body.token;
          localStorage.setItem('_token',token);
          /** redirect */
          this.authserv.isLoggedIn();

          this.router.navigateByUrl('/products');
        }
      },(error:any)=>{
          // console.log(error.status);
          // console.log(error);
          if((error.status == 404) ||(error.status == 422) || (error.error)){
            // console.log(error.error.message);
            
            if(error.error.message){
              alert(error.error.message);
            }
            // console.log(error.error.errors);
            if(error.error.errors){
              // console.log('errors');
              let errors = error.error.errors;
              for(let err of Object.values(errors)){
                let errmsggroup:any = err;
                for(let errmsg of errmsggroup){
                  alert(errmsg)
                }
              }
            }
          }
          
      })
    }

  }

}
