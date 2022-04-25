import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import Validation from 'src/app/custom/validation';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formG =  new FormGroup({});

  constructor(private fb:FormBuilder,private authserv:AuthService,private profserv:ProfileService,private router:Router,private toastr:ToastrService,private title:Title) {
    this.title.setTitle('Profile');
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

    /** get profile data */

    this.profserv.index().subscribe((res:any)=>{
      if(res.status == 200){
        this.formG.patchValue({
          'name' : res.body.user.name,
          'email' : res.body.user.email,
          'phone' : res.body.user.phone,
          'address' : res.body.user.address,
        });
      }
    },(error:any)=>{
      console.log(error);
      if((error.status == 404) ||(error.status == 422) || (error.error)){
        if(error.error.message){
          this.toastr.error(error.error.message,"Error!");
        }
        if(error.error.errors){
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

  get vform(){
    return this.formG.controls;
  }

  postProfile(){
    let data = { name:this.formG.value.name,phone:this.formG.value.phone,email:this.formG.value.email,address:this.formG.value.address,password:this.formG.value.password,password_confirmation:this.formG.value.cnfpassword};
    console.log(data);
    if(this.formG.valid){
      this.profserv.update(data).subscribe((res:any)=>{
        if(res.status == 200){
          this.toastr.success(res.body.message,"Success!");
        }
      },(error:any)=>{
          if(error.status == 401){
            this.authserv.logout();
            this.router.navigateByUrl('/login');
          }
          if((error.status == 404) ||(error.status == 422) || (error.error)){
            // console.log(error.error.message);
            
            if(error.error.message){
              this.toastr.error(error.error.message,"Error!");
            }
            if(error.error.errors){
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

}
