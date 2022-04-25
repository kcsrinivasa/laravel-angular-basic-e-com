<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $user = User::where('email',$request->email)->get()->first();

        if(!$user){ 
            return response(['message'=>'User not found. Invalid Email'],404);
        }
        if(!Hash::check($request->password,$user->password)){
            return response(['message'=>'Invalid credentials'],401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $res = [
            'message'=>'Succefully logged in',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
            'API_URL' => env('API_URL')
        ];

        return response($res,200);

    }


    public function register(RegisterRequest $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'password' => Hash::make($request->password),
        ]);


        $token = $user->createToken('myapptoken')->plainTextToken;

        $res = [
            'message'=>'Succefully registered the account',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
            'API_URL' => env('API_URL')
        ];

        return response($res,201);

    }


    public function logout(Request $request){
        // dd(auth('sanctum')->user()->name);
        auth('sanctum')->user()->tokens()->delete();
        $response = [
            'message' => 'Logged out'
        ];
        return response($response,201);
    }
}
