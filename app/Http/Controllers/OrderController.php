<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{

    public function getOrdersByUid(Request $request)
    {

        $request->validate([
            'uid' => 'required|string|exists:users,uid',
        ]);


        $user = User::where('uid', $request->uid)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (Auth::user()->is_admin !== 1 && Auth::id() !== $user->id) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }


        $orders = Order::where('user_id', $user->id)->with('items.product')->get();

        return response()->json($orders);
    }
    public function getAllOrder()
    {
        $orders = Order::with('items.product')->get();
        return response()->json($orders);
    }




    public function add(Request $request)
    {
        Log::info('Received order request:', $request->all());

        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            $totalAmount = 0;
            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                $totalAmount += $product->price * $item['quantity'];
            }

            $order = Order::create([
                'user_id' => $request->user_id,
                'total_amount' => $totalAmount,
                'status' => 'pending',
            ]);

            Log::info('Order created:', ['order_id' => $order->id]);

            foreach ($request->items as $item) {
                $orderItem = OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => Product::find($item['product_id'])->price,
                ]);
                Log::info('Order item added:', ['order_item_id' => $orderItem->id]);
            }

            DB::commit();
            Log::info('Order successfully committed:', ['order_id' => $order->id]);

            return response()->json(['message' => 'Order created successfully!', 'order' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order creation failed:', ['error' => $e->getMessage()]);

            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }


    public function show($id)
    {
        $order = Order::where('user_id', Auth::id())->with('items.product')->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order = Order::find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $order->update(['status' => $request->status]);

        return response()->json(['message' => 'Order status updated successfully!']);
    }

    public function destroy($id)
    {
        $order = Order::where('user_id', Auth::id())->find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        if ($order->status !== 'pending') {
            return response()->json(['error' => 'Cannot delete processed order'], 403);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully!']);
    }
    public function getOrdersByUser($userId)
    {
        $orders = Order::where('user_id', $userId)
            ->with(['items.product.images' => function ($query) {
                $query->select('id', 'product_id', 'image_url');
            }])
            ->get()
            ->map(function ($order) {
                $order->items->transform(function ($item) {
                    $item->product->image_url = $item->product->images->first()->image_url ?? null;
                    return $item;
                });
                return $order;
            });

        return response()->json($orders);
    }
    public function cancelOrder($orderId)
{
    $order = Order::find($orderId);

    if (!$order) {
        return response()->json(['error' => 'Order not found'], 404);
    }

    if ($order->status !== 'pending') {
        return response()->json(['error' => 'Only pending orders can be canceled'], 400);
    }

    $order->update(['status' => 'cancelled']);

    return response()->json(['message' => 'Order has been canceled']);
}

}
