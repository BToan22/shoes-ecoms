<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean',
        ]);

        if (Auth::attempt($request->only('email', 'password'), $request->input('remember', false))) {
            return response()->json([
                'message' => 'Login success',
                'status' => 200,
                'data' => [
                    'user' => Auth::user(),
                ]
            ]);
        }

        return response()->json([
            'message' => 'Login failed',
        ], 401);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'Logout success',
        ]);
    }

    public function me(Request $request)
    {
        $request->validate([
            'uid' => 'required|string|exists:users,uid',
        ]);

        $user = User::where('uid', $request->uid)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'status' => 404,
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => [
                'user' => $user,
            ]
        ]);
    }


    public function forget(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            // $user->update([
            //     'password' => bcrypt('password'),
            // ]);

            return response()->json([
                'message' => 'Password reset success',
            ]);
        }

        return response()->json([
            'message' => 'Password reset failed',
        ], 401);
    }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'uid' => 'required|string|unique:users,uid',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:15',
            'address' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'uid' => $request->uid,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return response()->json([
            'message' => 'Register success',
            'status' => 201,
            'data' => [
                'user' => $user,
            ]
        ], 201);
    }
}
