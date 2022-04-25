<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'landmark' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zipcode' => 'required|string|max:255',
            'phone' => 'required|digits:10',
        ];
    }
}
