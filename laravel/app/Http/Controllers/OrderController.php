<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Http\Request;

use DB;

class OrderController extends Controller
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
        $order_products = OrderProduct::select(['orders.*','order_products.order_id','order_products.name','order_products.quantity',DB::raw("CONCAT('".$path."',order_products.image) as image")])->join('orders','orders.id','=','order_products.order_id')->where('orders.user_id',$user_id)->orderBy('order_products.order_id','desc')->get();


        $res = [
            'message' => 'order product list',
            'order_products' => $order_products
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
            'cart_ids'=>'required|array',
            'cart_ids.*'=>'required|integer|exists:carts,id',
            'address_id' => 'required|integer',
            'amount' => 'required|numeric'
        ]);

        $user_id = auth('sanctum')->user()->id;
        $order = Order::create([
            'user_id' => $user_id,
            'amount' => $request->amount,
            'address_id' => $request->address_id
        ]);

        $cart_ids = $request->cart_ids;
        foreach($cart_ids as $cid){
            $product = Product::select(['products.id','products.name','products.image','carts.quantity'])->join('carts','carts.product_id','=','products.id')->where('carts.id',$cid)->where('carts.user_id',$user_id)->get()->first();
            if($product){
                Cart::find($cid)->delete();
                OrderProduct::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'image' => $product->image,
                    'quantity' => $product->quantity,
                ]);
            }
        }

        $res = [
            'message' => 'Successfully placed the order',
            'order' => $order
        ];

        return response($res,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($order_id)
    {
        $user_id = auth('sanctum')->user()->id;
        $order = Order::where('user_id',$user_id)->where('id',$order_id)->get()->first();
        $address = Address::where('user_id',$user_id)->where('id',$order->address_id)->get()->first();

        if(!$order){
            $res = [ 'message' => 'order not found' ];
            return response($res,404);
        }

        $path = env('FILE_BASE_URL');
        $order_products = OrderProduct::select(['order_products.*',DB::raw("CONCAT('".$path."',order_products.image) as image")])->where('order_products.order_id',$order_id)->get();


        $res = [
            'message' => 'order details',
            'order' => $order,
            'address' => $address,
            'order_products' => $order_products
        ];

        return response($res,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
