<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use App\Http\Requests\AddressRequest;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = auth('sanctum')->user()->id;
        $address_list = Address::where('user_id',$user_id)->get();

        $res = [
            'message' => 'address list',
            'address_list' => $address_list
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
    public function store(AddressRequest $request)
    {
        $user_id = auth('sanctum')->user()->id;
        $address = Address::create([
            'user_id' => $user_id,
            'name' => $request->name,
            'street' => $request->street,
            'landmark' => $request->landmark,
            'city' => $request->city,
            'state' => $request->state,
            'zipcode' => $request->zipcode,
            'phone' => $request->phone,
        ]);

        $res = [
            'message' => 'Successfully added the address',
            'address' => $address
        ];

        return response($res,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function show(Address $address)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        //
    }
}
