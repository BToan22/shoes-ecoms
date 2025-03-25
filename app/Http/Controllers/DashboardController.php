<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getDashboardStats()
    {
        $totalProducts = Product::count();
        $totalUsers = User::where('is_admin', '!=', 1)->count();
        $ordersToday = Order::whereDate('created_at', Carbon::today())->count();
        $ordersThisMonth = Order::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();

        return response()->json([
            'total_products' => $totalProducts,
            'total_users' => $totalUsers,
            'orders_today' => $ordersToday,
            'orders_this_month' => $ordersThisMonth,
        ]);
    }
}
