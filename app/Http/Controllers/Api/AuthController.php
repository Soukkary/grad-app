<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
         // Validate the login request
         $credentials = $request->validated();

         // Find the user by email
         $user = User::where('email', $credentials['email'])->first();
 
         // Check if the user exists
         if (!$user) {
             return response()->json(['message' => 'Invalid email address'], 401);
         }
 
         // Check if the password is correct
         if (!Hash::check($credentials['password'], $user->password)) {
             return response()->json(['message' => 'Incorrect password'], 402);
         }
 
         // Authenticate the user
         Auth::login($user);
 
         // Create a token for the user
         $token = $user->createToken('main')->plainTextToken;
 
         return response()->json([
             'user' => $user,
             'token' => $token,
         ]);
    }

    

    public function register(RegisterRequest $request)
    {
        /** @var \App\Models\User $user */
        
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'password' => bcrypt($data['password']),
        ]);
    
        
        
        
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    
    public function logout(Request $request)
    {
       

    }
    
}
