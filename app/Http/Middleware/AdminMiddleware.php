<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Log;

use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;


class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('$request:', ['$request' => $request]);

        try {
            if (!$token = JWTAuth::getToken()) {
                return response()->json(['message' => 'Token not provided'], 401);
            }

            $user = JWTAuth::parseToken()->authenticate();
            Log::info('Người dùng đăng nhập:', ['user' => $user]);

            if (!$user || !$user->is_admin) {
                return response()->json(['error' => 'Unauthorized. Admin access required.'], 403);
            }

            return $next($request);
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['message' => 'Token is invalid'], 401);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token is missing or incorrect'], 401);
        }
    }
}
