<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use DB;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = auth('sanctum')->user()->id;

        $path = env('FILE_BASE_URL');
        $cart_items = Product::select(['products.*',DB::raw("CONCAT('".$path."',products.image) as image"),'carts.id as cartId','carts.quantity as cartQuantity'])->join('carts','carts.product_id','=','products.id')->where('carts.user_id',$user_id)->get();


        $res = [
            'message' => 'cart item list',
            'cart_items' => $cart_items
        ];

        return response($res,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer'
        ]);

        $user_id = auth('sanctum')->user()->id;

        $exist = Cart::where('user_id',$user_id)->where('product_id',$request->product_id)->get()->first();

        if($exist){
            return response(['message'=>'Product already added to cart'],200);
        }

        $product = Product::find($request->product_id);
        if(!$product){
            return response(['message'=>'Product not found'],404);
        }
        if($product->quantity < $request->quantity){
            return response(['message'=>'Cart quantity is not be more than product quantity'],422);
        }

        $cart = Cart::create([
            'user_id' => $user_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);
        $product->update([
            'quantity' => $product->quantity - $request->quantity
        ]);

        $res = [
            'message' => 'Successfully added item to cart',
            'cart' => $cart
        ];

        return response($res,201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $cart_id)
    {
        
        $request->validate([
            'quantity' => 'required|integer'
        ]);

        $user_id = auth('sanctum')->user()->id;

        $cart = Cart::where('user_id',$user_id)->where('id',$cart_id)->get()->first();

        if(!$cart){
            return response(['message'=>'cart product not found'],404);
        }
        $product = Product::find($cart->product_id);
        if(!$product){
            return response(['message'=>'Product not found'],404);
        }
        if(($product->quantity + $cart->quantity) < $request->quantity){
            return response(['message'=>'Cart quantity is not be more than product quantity'],422);
        }
        $product->update([
            'quantity' => $product->quantity + $cart->quantity
        ]);
        $cart->update([
            'quantity' => $request->quantity,
        ]);
        $product->update([
            'quantity' => $product->quantity - $request->quantity
        ]);

        $res = [
            'message' => 'Successfully updated the cart item',
            'cart' => $cart
        ];

        return response($res,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy($cart_id)
    {

        $user_id = auth('sanctum')->user()->id;

        $cart = Cart::where('user_id',$user_id)->where('id',$cart_id)->get()->first();

        if(!$cart){
            $res = [ 'message' => 'cart item not found' ];
            return response($res,404);
        }
        $product = Product::find($cart->product_id);
        if($product){
            $product->update([
                'quantity' => $product->quantity + $cart->quantity
            ]);
        }
        

        $cart->delete();
        $res = [ 'message' => 'Successfully deleted the cart item' ];
        return response($res,200);
    }
}
