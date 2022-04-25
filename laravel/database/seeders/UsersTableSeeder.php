<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('Test@123'),
            'phone' => '8090909090',
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Arya Bhata',
            'email' => 'arya@gmail.com',
            'password' => Hash::make('Test@123'),
            'phone' => '9090909090',
            'address' => 'Bengaluru',
        ]);

        User::create([
            'name' => 'Abdhul Kalam',
            'email' => 'kalam@gmail.com',
            'password' => Hash::make('Test@123'),
            'phone' => '5090909090',
            'address' => 'Mysore',
        ]);
    }
}
