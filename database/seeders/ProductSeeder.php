<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Giày Nike Air Max',
                'brand' => 'Nike',
                'description' => 'Giày thể thao Nike Air Max êm ái, phù hợp với mọi hoạt động thể thao.',
                'price' => 2500000,
                'images' => [
                    'nike_air_max_1.jpg',
                    'nike_air_max_2.jpg'
                ]
            ],
            [
                'name' => 'Giày Adidas Ultraboost',
                'brand' => 'Adidas',
                'description' => 'Giày Adidas Ultraboost với công nghệ Boost giúp tăng độ đàn hồi và êm ái.',
                'price' => 3200000,
                'images' => [
                    'adidas_ultraboost_1.jpg',
                    'adidas_ultraboost_2.jpg'
                ]
            ],
            [
                'name' => 'Giày Puma RS-X',
                'brand' => 'Puma',
                'description' => 'Giày Puma RS-X mang phong cách retro hiện đại, phù hợp với thời trang đường phố.',
                'price' => 2100000,
                'images' => [
                    'puma_rsx_1.jpg',
                    'puma_rsx_2.jpg'
                ]
            ],
            [
                'name' => 'Giày Converse Chuck Taylor',
                'brand' => 'Converse',
                'description' => 'Giày Converse Chuck Taylor cổ cao, biểu tượng thời trang cổ điển.',
                'price' => 1500000,
                'images' => [
                    'converse_chuck_taylor_1.jpg',
                    'converse_chuck_taylor_2.jpg'
                ]
            ]
        ];

        foreach ($products as $productData) {
            $product = Product::create([
                'name' => $productData['name'],
                'brand' => $productData['brand'],
                'description' => $productData['description'],
                'price' => $productData['price']
            ]);
            foreach ($productData['images'] as $image) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => 'products/' . $image
                ]);
            }
        }
    }
}
