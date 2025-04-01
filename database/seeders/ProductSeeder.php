<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use League\Csv\Reader;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $csv = Reader::createFromPath(storage_path('app/nike_gym.csv'), 'r');
        $csv->setHeaderOffset(0);

        foreach ($csv as $record) {
            Product::create([
                'name'        => $record['name'],
                'brand'       => $record['brand'],
                'category_id' => $record['category_id'],
                'description' => $record['description'],
                'price'       => $record['price'],
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }
}
