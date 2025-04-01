<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategoryController;

//product
Route::get('/products', [ProductController::class, 'getList']);
Route::get('/products-search', [ProductController::class, 'getListWithSearch']);
Route::get('/products/latest', [ProductController::class, 'getLatestProducts']);
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

//category
Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile/{id}', [AuthController::class, 'userProfile']);
    Route::get('/me', [AuthController::class, 'me']);

    // Order routes
    Route::post('/orders/add', [OrderController::class, 'add']);
    Route::get('/orders/by-user/{userId}', [OrderController::class, 'getOrdersByUser']);
    Route::post('/orders/{orderId}/cancel', [OrderController::class, 'cancelOrder']);
    Route::put('/orders/{orderId}/status', [OrderController::class, 'updateOrderStatus']);
    //product view
    Route::post('/product/view/{id}', [ProductController::class, 'storeProductView']);

    //category
    Route::get('/favorite-categories', [CategoryController::class, 'getFavoriteCategories']);
    Route::post('/favorite-categories', [CategoryController::class, 'saveFavoriteCategories']);

    //recommen
    Route::get('/user/recommended-shoes', [ProductController::class, 'recommendShoes']);

});

Route::middleware(['auth', 'admin'])->group(function () {
    //product
    Route::post('/products/add', [ProductController::class, 'add']);
    Route::post('/upload-image', [ProductController::class, 'uploadImage']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'delete']);
    //dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'getDashboardStats']);

    // Order management
    Route::get('/getAllOrder', [OrderController::class, 'getAllOrder']);

    //category
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});
