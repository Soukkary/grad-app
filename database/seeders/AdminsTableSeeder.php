<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = bcrypt('1234');
        $adminRecords = [
            ['id'=>1, 'name'=>'Ahmed', 'username'=>'hoba', 'type'=>'Super-Admin', 'phone'=>'01000878444', 'email'=>'hobz@gmail.com', 'password'=>$password, 'image'=>'', 'status'=>1],
        ];
        Admin::insert($adminRecords);
    }
}
