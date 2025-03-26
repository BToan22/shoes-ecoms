<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $token = $request->cookie('jwt');
            if (!$token) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }


            $user = JWTAuth::setToken($token)->authenticate();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 401);
            }

            Auth::login($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
