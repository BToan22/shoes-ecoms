<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Payment;

class PaymentController extends Controller
{
    //
    public function createPaymentMomo(Request $request)
    {
        $endpoint = config('services.momo.endpoint');
        $partnerCode = config('services.momo.partner_code');
        $accessKey = config('services.momo.access_key');
        $secretKey = config('services.momo.secret_key');

        $orderId = time();
        $amount = $request->amount;
        $redirectUrl = "http://localhost:5173/payment-success";
        $ipnUrl = route('momo.ipn');
        Log::info('Generated ipnUrl:', ['ipnUrl' => $ipnUrl]);

        $data = [
            "partnerCode" => $partnerCode,
            "accessKey" => $accessKey,
            "requestId" => time(),
            "amount" => $amount,
            "orderId" => $orderId,
            "orderInfo" => "Thanh toán đơn hàng #$orderId",
            "returnUrl" => $redirectUrl,
            "ipnUrl" => $ipnUrl,
            "requestType" => "captureWallet",
            "extraData" => "",
        ];

        Log::info('Momo Request Data:', $data);

        $rawData = "accessKey={$accessKey}&amount={$amount}&extraData=&ipnUrl={$ipnUrl}&orderId={$orderId}&orderInfo=Thanh toán đơn hàng #{$orderId}&partnerCode={$partnerCode}&returnUrl={$redirectUrl}&requestId={$data['requestId']}&requestType=captureWallet";

        $signature = hash_hmac('sha256', $rawData, $secretKey);
        $data["signature"] = $signature;


        $response = Http::post($endpoint, $data);

        Log::info('Momo API Response:', $response->json());

        return response()->json($response->json());
    }


    public function ipnCallback(Request $request)
    {
        Log::info('Momo IPN callback:', $request->all());

        return response()->json(['status' => 'success']);
    }
    // stripe
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => ['name' => 'Thanh toán đơn hàng'],
                    'unit_amount' => $request->amount,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => $frontendUrl . '/payment-status?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $frontendUrl . '/payment-cancel',
        ]);

        return response()->json([
            'url' => $session->url,
            'session_id' => $session->id
        ]);
    }
    public function checkPaymentStatus(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $session_id = $request->query('session_id');

        if (!$session_id) {
            return response()->json(['status' => 'error', 'message' => 'Invalid session ID.'], 400);
        }

        try {
            $session = Session::retrieve($session_id);
            if ($session->payment_status === 'paid') {
                return response()->json(['status' => 'success']);
            } else {
                return response()->json(['status' => 'pending']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    //
    public function add(Request $request)
    {
        $payment = Payment::create([
            'order_id' => $request->order_id,
            'session_id' => $request->session_id,
            'status' => 'pending',
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
        ]);

        return response()->json($payment, 201);
    }

    public function updateStatusPayment(Request $request)
    {
        $payment = Payment::where('session_id', $request->session_id)->first();

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        $payment->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Payment status updated successfully!',
            'status' => $payment->status,
            'order_id' => $payment->order_id,
        ]);
    }
}
