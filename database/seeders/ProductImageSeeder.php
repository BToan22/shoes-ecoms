<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductImage;
use League\Csv\Reader;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvPath = storage_path('app/product_images.csv');

        if (!file_exists($csvPath)) {
            echo "File product_images.csv không tồn tại.\n";
            return;
        }

        // Đọc file CSV
        $csv = Reader::createFromPath($csvPath, 'r');
        $csv->setHeaderOffset(0); // Dòng đầu tiên là header

        // Kiểm tra trùng header
        $header = $csv->getHeader();
        $duplicates = array_keys(array_filter(array_count_values($header), fn ($count) => $count > 1));

        if (!empty($duplicates)) {
            echo "Lỗi: Các cột bị trùng trong header: " . implode(', ', $duplicates) . "\n";
            return;
        }

        // Lặp qua từng dòng và nhập vào database
        foreach ($csv as $record) {
            ProductImage::create([
                'product_id' => $record['product_id'],
                'image_url'  => $record['image_url'],
            ]);
        }

        echo "Import hình ảnh sản phẩm thành công!\n";
    }
}
