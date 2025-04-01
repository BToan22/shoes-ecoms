<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Normal'],
            ['name' => 'Gym'],
            ['name' => 'Soccer'],
            ['name' => 'Running'],
            ['name' => 'Golf'],
            ['name' => 'Basketball'],
        ];

        DB::table('categories')->insert($categories);
    }
}
