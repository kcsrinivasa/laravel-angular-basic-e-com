![Laravel](https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg)


# Laravel API for basic e-commerce(pizza order) web application

Hi All!

Here is the example focused on laravel APIs on basic `crud`, `authentication`, `e-commerce` application.



### Step 1: Install Laravel
```bash
composer create-project laravel/laravel laravel
```

### Step 2: Create models with controller
```bash
php artisan make:model Product -mcr
php artisan make:model Cart -mcr
php artisan make:model Order -mcr
php artisan make:model OrderProduct -m
php artisan make:model Address -mcr
```
-mcr stands for m: migration, c: controller, r: resource methods in controller


### Step 3: Create controller
```bash
php artisan make:controller AuthController
php artisan make:controller ProfileController -r -mUser
```

### Step 4: Create request for validation
```bash
php artisan make:request Auth/LoginRequest
php artisan make:request Auth/RegisterRequest
php artisan make:request AddressRequest
php artisan make:request ProfileRequest
```

### Step 5: Create seeders for testing data
```bash
php artisan make:seeder UsersTableSeeder
php artisan make:seeder ProductsTableSeeder
```

### Step 6: Add Routes in routes/api.php
```bash
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
```

### Step 7: 
Update all models
``` 
    refer in app/Models/* 
```
Update all migrations
``` 
    refer in database/migrations/* 
```
Update all seeders
``` 
    refer in database/seeders/* 
```
Update all controllers
``` 
    refer in app/Http/Controller/* 
```
Update all requests
``` 
    refer in app/Http/Requests/* 
```

### Step 8: Update database credentials
```bash
DB_DATABASE=laravel_pizza
DB_USERNAME=root
DB_PASSWORD=db_password
```

### Step 9: Final run and check in browser
```bash
php artisan migrate
php artisan serve
```
### Step 10: Get data on api with following base url 
```bash
http://localhost:8000/api/
```

## Note : Refer the documentation for API requests
[![document-api](https://img.shields.io/badge/Documentation-APIs-blue)](https://github.com/kcsrinivasa/laravel-angular-basic-e-com/blob/main/laravel/pizza-api-documentation.docx)