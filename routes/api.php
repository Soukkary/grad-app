<?php /** @noinspection PhpMultipleClassDeclarationsInspection */

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GigController as ApiGigController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\SocialiteController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GigController;
use App\Http\Controllers\Api\ProfileformController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(


function() {
    Route::get('/user', function (Request $request) {

        return $request->user();

    });
    Route::post('/logout',[AuthController::class,'logout']);
    Route::apiResource('/users', UserController::class);
});

Route::post('/api/auth/google/callback', function (Request $request) {
    $name = $request->input('name');
    $email = $request->input('email');
    // Add other user information you want to store

    // Store user data in the database
    $user = User::firstOrCreate(['email' => $email], ['name' => $name]);

    return response()->json(['message' => 'User data stored successfully']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout']);
// routes/api.php
Route::get('/DisplayUser', [UserController::class, 'index']);
Route::get('/userprofile/{userId}', [UserController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/creategig', [GigController::class, 'store']);
    Route::get('/gigs', [GigController::class, 'index']);
    Route::post('/createprofile',[GigController::class,'storeP']);
    Route::get('/usergigs/{userId}', [GigController::class, 'getUserGigs']);
});
// routes/web.php







Route::get('auth/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

Route::get('auth/facebook', [SocialiteController::class, 'redirectToFacebook']);
Route::get('auth/facebook/callback', [SocialiteController::class, 'handleFacebookCallback']);

