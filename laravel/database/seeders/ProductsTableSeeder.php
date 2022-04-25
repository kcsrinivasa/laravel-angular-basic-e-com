<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'name'=>'Tandoori Paneer',
            'price'=>519,
            'quantity'=>10,
            'image'=>'images/tandoori_paneer.jpg',
            'description'=>'Spiced paneer, Onion, Green Capsicum & Red Paprika in Tandoori Sauce',
        ]);


        Product::create([
            'name'=>'Veggie Supreme',
            'price'=>549,
            'quantity'=>80,
            'image'=>'images/veggie_supreme.jpg',
            'description'=>'Black Olives, Green Capsicum, Mushroom, Onion, Red Paprika, Sweet Corn',
        ]);


        Product::create([
            'name'=>'Double Paneer Supreme',
            'price'=>589,
            'quantity'=>15,
            'image'=>'images/double_paneer_supreme.jpg',
            'description'=>'Spiced Paneer, Herbed Onion & Green Capsicum, Red Paprika',
        ]);


        Product::create([
            'name'=>'Margherita',
            'price'=>270,
            'quantity'=>20,
            'image'=>'images/margherita.jpg',
            'description'=>'Cheese',
        ]);

        Product::create([
            'name'=>'Spiced Paneer',
            'price'=>439,
            'quantity'=>10,
            'image'=>'images/spiced_paneer.jpg',
            'description'=>'Masala Paneer, Onion, Tomato',
        ]);

        Product::create([
            'name'=>'Country Feast',
            'price'=>539,
            'quantity'=>12,
            'image'=>'images/country_feast.jpg',
            'description'=>'Herbed Onion & Green capsicum, Sweet Corn, Tomato, Mushroom',
        ]);

        Product::create([
            'name'=>'Veggie Lover',
            'price'=>519,
            'quantity'=>10,
            'image'=>'images/veggie_lover.jpg',
            'description'=>'Onion, Green Capsicum, Mushroom, Tomato, Red Paprika',
        ]);

        Product::create([
            'name'=>'Veggie Supreme spl',
            'price'=>889,
            'quantity'=>5,
            'image'=>'images/veggie_supreme_spl.jpg',
            'description'=>'Black Olives, Green Capsicum, Mushroom, Onion, Red Paprika, Sweet Corn',
        ]);
        Product::create([
            'name'=>'Farmers Pick',
            'price'=>519,
            'quantity'=>10,
            'image'=>'images/farmers_pick.jpg',
            'description'=>'Herbed Onion & Green Capsicum, Red Capsicum, Mushroom, Baby Corn',
        ]);
        Product::create([
            'name'=>'Choco Volcano Cake',
            'price'=>99,
            'quantity'=>20,
            'image'=>'images/choco_volcano_cake.jpg',
            'description'=>'Choco Delight With A Gooey Chocolate Volcano Centre',
        ]);
    }
}
