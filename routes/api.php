<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/upload-image', [ProductController::class, 'uploadImage']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/me', [AuthController::class, 'me']);
Route::get('/getAllOrder', [OrderController::class, 'getAllOrder']);
Route::post('/orders/add', [OrderController::class, 'add']);
Route::get('/orders/by-user/{userId}', [OrderController::class, 'getOrdersByUser']);
Route::post('/orders/{orderId}/cancel', [OrderController::class, 'cancelOrder']);
Route::put('/orders/{orderId}/status', [OrderController::class, 'updateStatus']);

// Route::post ()

Route::post('/momo-payment', [PaymentController::class, 'createPaymentMomo']);
Route::post('/momo-ipn', [PaymentController::class, 'ipnCallback'])->name('momo.ipn');
Route::post('/stripe/checkout', [PaymentController::class, 'createCheckoutSession']);
Route::get('/stripe/payment-status', [PaymentController::class, 'checkPaymentStatus']);
Route::post('/payments', [PaymentController::class, 'add']);
Route::post('/payments/update-status', [PaymentController::class, 'updateStatusPayment']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth')->group(function () {
    Route::get('/user', [AuthController::class, 'userProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('/products/add', [ProductController::class, 'add']);
});
