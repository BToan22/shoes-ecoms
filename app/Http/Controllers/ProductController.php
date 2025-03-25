<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Models\ProductImage;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ProductController extends Controller
{
    public function getList(Request $request){
        $products = Product::with('images')->get();
        return response()->json($products);
    }
    public function getListWithSearch(Request $request)
    {

        $query = Product::with('images');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('brands')) {
            $brands = is_array($request->brands) ? $request->brands : explode(',', $request->brands);
            if (!empty($brands)) {
                $query->whereIn('brand', $brands);
            }
        }

        if ($request->filled('minPrice') && is_numeric($request->minPrice)) {
            $query->where('price', '>=', $request->minPrice);
        }

        if ($request->filled('maxPrice') && is_numeric($request->maxPrice)) {
            $query->where('price', '<=', $request->maxPrice);
        }

        $products = $query->paginate($request->get('per_page', 6));

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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $product = Product::create($validatedData);
        Log::info('Sản phẩm đã lưu:', ['product' => $product]);

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {
                // Log::info('🖼 Ảnh nhận được:', [
                //     'name' => $image->getClientOriginalName(),
                //     'size' => $image->getSize(),
                //     'mime_type' => $image->getMimeType()
                // ]);
                $path = $image->store('public/products');
                // Log::info('Ảnh đã lưu:', ['path' => $path]);

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                ]);
            }
        } else {
            Log::warning('No image uploaded.');
        };

        return response()->json([
            'message' => 'Sản phẩm đã được thêm thành công!',
            'product' => $product->load('images')
        ], 201);
    }

    public function uploadImage(Request $request)
    {
        Log::info('📥 Nhận yêu cầu tải ảnh', ['request_data' => $request->all()]);

        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);



        $path = $request->file('image')->store('products', 'public');




        $imageUrl = str_replace('public/', 'storage/', $path);



        return response()->json([
            'message' => 'Upload Imange Complete!',
            'image_url' => url($imageUrl)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'brand' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product->update($validatedData);
        Log::info('Product updated successfully:', ['product' => $product]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('public/products');

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                ]);
            }
        }

        return response()->json([
            'message' => 'Product has been updated successfully!',
            'product' => $product->load('images'),
        ], 200);
    }
    public function delete($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        ProductImage::where('product_id', $id)->delete();

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
