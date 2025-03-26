<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;




class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(['user' => $user, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $cookie = cookie('jwt', $token, 60, '/', null, true, true, false, 'None');
        return response()->json(['message' => 'Login success'])->withCookie($cookie);
    }

    public function userProfile($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function logout(Request $request)
    {
        $token = $request->cookie('jwt');

        if (!$token) {
            return response()->json(['message' => 'Token not found'], 401);
        }

        try {
            JWTAuth::invalidate($token);
            return response()->json(['message' => 'Logged out'])
                ->withCookie(cookie('jwt', '', -1, '/', request()->getHost(), true, true, false, 'None'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to logout.'], 500);
        }
    }
    public function me(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at,
            'is_admin' => $user->is_admin,
        ]);
    }
}
