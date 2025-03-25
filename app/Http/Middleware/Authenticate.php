<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\JsonResponse;

class Authenticate extends Middleware
{
    protected function authenticate($request, array $guards)
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                $this->unauthenticated($request, $guards);
            }

            return $user;
        } catch (JWTException $e) {
            $this->unauthenticated($request, $guards);
        }
    }

    protected function unauthenticated($request, array $guards)
    {
        throw new \Illuminate\Http\Exceptions\HttpResponseException(
            response()->json(['error' => 'Invalid or expired token. Please log in again.'], JsonResponse::HTTP_UNAUTHORIZED)
        );
    }
}
