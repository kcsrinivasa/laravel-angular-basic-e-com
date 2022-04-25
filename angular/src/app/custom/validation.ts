import { AbstractControl, ValidatorFn } from "@angular/forms";


export default class Validation{
    static match(controlName:string, checkControlName:string):ValidatorFn{
        return (controls:AbstractControl)=>{
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);
            if(checkControl?.errors && checkControl.errors['matchstr']){
                return null;
            };
            // compair the both value
            if(control?.value !== checkControl?.value){
                controls.get(checkControlName)?.setErrors({matchstr:true})
                return {matchstr:true};
            }else{
                return null;
            }
            
        }
    }
}