<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

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
}
