<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products/add', [ProductController::class, 'add']);
Route::post('/upload-image', [ProductController::class, 'uploadImage']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/me', [AuthController::class, 'me']);
Route::get('/getAllOrder', [OrderController::class, 'getAllOrder']);
Route::post('/orders/add', [OrderController::class, 'add']);
Route::get('/orders/by-user/{userId}', [OrderController::class, 'getOrdersByUser']);
Route::post('/orders/{orderId}/cancel', [OrderController::class, 'cancelOrder']);
// Route::post ()


