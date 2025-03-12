<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Models\ProductImage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('images')->get();
        Log::info($products);
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('images')->find($id);


        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }


        return response()->json($product);
    }
    public function add(Request $request)
    {
        Log::info('Bắt đầu lưu sản phẩm', ['request_data' => $request->all()]);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        Log::info('Dữ liệu hợp lệ:', $validatedData);

        $product = Product::create($validatedData);
        Log::info('Sản phẩm đã lưu:', ['product' => $product]);

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {
                Log::info('🖼 Ảnh nhận được:', [
                    'name' => $image->getClientOriginalName(),
                    'size' => $image->getSize(),
                    'mime_type' => $image->getMimeType()
                ]);
                $path = $image->store('public/products');
                Log::info('Ảnh đã lưu:', ['path' => $path]);

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                ]);
            }
        } else {
            Log::warning('Không có ảnh nào được tải lên.');
        }

        Log::info('Sản phẩm đã thêm thành công!', ['product' => $product->load('images')]);

        return response()->json([
            'message' => 'Sản phẩm đã được thêm thành công!',
            'product' => $product->load('images')
        ], 201);
    }

    public function uploadImage(Request $request)
    {
        Log::info('📥 Nhận yêu cầu tải ảnh', ['request_data' => $request->all()]);

        // Kiểm tra đầu vào
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        Log::info('✅ Ảnh hợp lệ:', ['image_info' => $request->file('image')->getClientOriginalName()]);

        // Lưu ảnh vào thư mục storage/app/public/products
        $path = $request->file('image')->store('products', 'public');

        Log::info('📁 Ảnh đã lưu tại:', ['path' => $path]);

        // Chuyển đường dẫn thành URL có thể truy cập
        $imageUrl = str_replace('public/', 'storage/', $path);

        Log::info('🔗 Đường dẫn ảnh sau khi chỉnh sửa:', ['image_url' => $imageUrl]);

        return response()->json([
            'message' => 'Ảnh đã được tải lên thành công!',
            'image_url' => url($imageUrl)
        ], 201);
    }
}
