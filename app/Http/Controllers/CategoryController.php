<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function getFavoriteCategories()
    {
        $token = request()->cookie('jwt');
        if (!$token) {
            Log::error('No token found in cookie');
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = JWTAuth::setToken($token)->authenticate();

        $favoriteCategories = $user->favoriteCategories;

        return response()->json($favoriteCategories);
    }
    public function saveFavoriteCategories(Request $request)
    {
        $token = request()->cookie('jwt');
        if (!$token) {
            Log::error('No token found in cookie');
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = JWTAuth::setToken($token)->authenticate();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }


        $validated = $request->validate([
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:categories,id',
        ]);


        if (!empty($validated['category_ids'])) {
            $user->favoriteCategories()->sync($validated['category_ids']);
        } else {

            $user->favoriteCategories()->sync([]);
        }

        return response()->json(['message' => 'Favorite categories updated successfully']);
    }

    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create($request->only('name'));

        return response()->json($category, 201);
    }


    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->only('name'));

        return response()->json($category);
    }


    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
