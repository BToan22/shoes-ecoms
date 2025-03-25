<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DashboardController;


Route::get('/products', [ProductController::class, 'getList']);
Route::get('/products-search', [ProductController::class, 'getListWithSearch']);

Route::get('/products/{id}', [ProductController::class, 'show']);


Route::post('/momo-payment', [PaymentController::class, 'createPaymentMomo']);
Route::post('/momo-ipn', [PaymentController::class, 'ipnCallback'])->name('momo.ipn');
//credit card
Route::post('/stripe/checkout', [PaymentController::class, 'createCheckoutSession']);
Route::get('/stripe/payment-status', [PaymentController::class, 'checkPaymentStatus']);
Route::post('/payments', [PaymentController::class, 'add']);
Route::post('/payments/update-status', [PaymentController::class, 'updateStatusPayment']);
//login register
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    //order
    Route::post('/orders/add', [OrderController::class, 'add']);
    Route::get('/orders/by-user/{userId}', [OrderController::class, 'getOrdersByUser']);
    Route::post('/orders/{orderId}/cancel', [OrderController::class, 'cancelOrder']);
    Route::put('/orders/{orderId}/status', [OrderController::class, 'updateOrderStatus']);
});

Route::middleware(['auth', 'admin'])->group(function () {
    //product
    Route::post('/products/add', [ProductController::class, 'add']);
    Route::post('/upload-image', [ProductController::class, 'uploadImage']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'delete']);
    Route::get('/dashboard/stats', [DashboardController::class, 'getDashboardStats']);


    //order
    Route::get('/getAllOrder', [OrderController::class, 'getAllOrder']);

});
