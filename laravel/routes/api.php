<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login','App\Http\Controllers\AuthController@login');
Route::post('/register','App\Http\Controllers\AuthController@register');
Route::get('/products','App\Http\Controllers\ProductController@index');
Route::get('/products/{product}/details','App\Http\Controllers\ProductController@show');

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout','App\Http\Controllers\AuthController@logout');

    Route::resource('cart','App\Http\Controllers\CartController');

    Route::get('/order','App\Http\Controllers\OrderController@index');
    Route::post('/order','App\Http\Controllers\OrderController@store');
    Route::get('/order/{order}','App\Http\Controllers\OrderController@show');
    Route::get('/address','App\Http\Controllers\AddressController@index');
    Route::post('/address','App\Http\Controllers\AddressController@store');

    Route::get('/profile','App\Http\Controllers\ProfileController@index');
    Route::put('/profile','App\Http\Controllers\ProfileController@update');
    Route::delete('/profile','App\Http\Controllers\ProfileController@destroy');

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
