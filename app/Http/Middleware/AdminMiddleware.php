<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Log;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $token = $request->bearerToken() ?? $request->cookie('jwt');

            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 401);
            }

            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();

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
