<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.regex'=>'Please enter valid name',
            'email.regex'=>'Please enter valid email',
            'address.regex'=>'Please enter valid address',
            'phone.required'=>'Phone number is required',
            'phone.digits'=>'Phone number must be 10 digits',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required|string|regex:/[a-zA-Z]/|max:255',
            'email'=>'required|string|email|regex:/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix|max:255|unique:users',
            'password'=>'required|string|min:8|confirmed',
            'phone'=>'required|digits:10',
            'address'=>'required|string|regex:/[a-zA-Z]/|max:255',
        ];
    }
}
