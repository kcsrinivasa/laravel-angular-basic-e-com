![Angular](https://raw.githubusercontent.com/angular/angular/master/aio/src/assets/images/logos/angular/angular.png)


# Angular web application for basic e-commerce(pizza order)

Hi All!

Here is the example focused on angular on basic `crud`, `authentication`, `e-commerce`, `bootstrap`, `sweet-alert`, `toaster`, `TDF/Reactive form validation`, `custom validation`, `RxJS subject`, `dynamic navbar` and etc.



### Step 1: Install Angular
```bash
ng new angular
```

### Step 2: Install NPM packages are needed
```bash
npm i bootstrap --save  /** install bootstrap */
npm i jwt-decode   /** install jwt decode package */
npm i ngx-toastr --save   /** install toaser alert */
npm i @angular/animations --save   /** install animations */
npm i sweetalert2 --save  /** install sweet alert */
```

### Step 3: Create components
```bash
ng g c components/nav
ng g c components/login
ng g c components/register
ng g c components/profile

ng g c components/welcome
ng g c components/product
ng g c components/productdetail
ng g c components/cart
ng g c components/checkout
ng g c components/order
ng g c components/orderdetail
```

### Step 4: Create services
```bash
ng g s services/auth
ng g s services/profile
ng g s services/product
ng g s services/cart
ng g s services/order
ng g s services/address
```

### Step 5: Add API base url in config
Create src/app/config/url.php
```bash
export const API_URL = 'http://localhost:8000/api/';
```

### Step 6: Final run and check in browser
```bash
ng serve --o
```
### Step 7: check web application with following base url 
```bash
http://localhost:4000
```