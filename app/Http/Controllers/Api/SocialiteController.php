<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function handleGoogleCallback()
    {
        try{

            $user = Socialite::driver('google')->user();
            $findUser = User::where('social_id', $user->id)->first();
            if($findUser)
            {
                Auth::login($findUser);
                return response()->json($findUser);    //used for APIs
            } else{
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => bcrypt('karim1234'),
                    'social_id' => $user->id,
                    'social_type' => 'google',
                ]);
                Auth::login($newUser);
                return response()->json($newUser);
            }
        } catch(Exception $ex) {
            dd($ex->getMessage());
        }
    }

    public function handleFacebookCallback()
    {
        try{

            $user = Socialite::driver('facebook')->user();
            $findUser = User::where('social_id', $user->id)->first();
            if($findUser)
            {
                Auth::login($findUser);
                return response()->json($findUser);    //used for APIs
            } else{
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => bcrypt('karim1234'),
                    'social_id' => $user->id,
                    'social_type' => 'facebook',
                ]);
                Auth::login($newUser);
                return response()->json($newUser);
            }
        } catch(Exception $ex) {
            dd($ex->getMessage());
        }
    }
}
