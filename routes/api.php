<?php /** @noinspection PhpMultipleClassDeclarationsInspection */

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\SocialiteController;
use App\Http\Controllers\Api\ChatHistoryController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {

        return $request->user();

    });

    Route::post('/logout',[AuthController::class,'logout']);
    Route::apiResource('/users', UserController::class);
});

Route::get('/jobs', [JobController::class, 'index']);
Route::post('/create-job', [JobController::class,'create']);
Route::post('/save-chat', [ChatHistoryController::class, 'saveChat']);
Route::get('/chat-history', [ChatHistoryController::class, 'getChatHistory']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('auth/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

Route::get('auth/facebook', [SocialiteController::class, 'redirectToFacebook']);
Route::get('auth/facebook/callback', [SocialiteController::class, 'handleFacebookCallback']);

