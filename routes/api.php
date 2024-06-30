<?php /** @noinspection PhpMultipleClassDeclarationsInspection */

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectDeveloperRequestController;
use App\Http\Controllers\Api\GigController as ApiGigController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\SocialiteController;
use App\Http\Controllers\Api\ChatHistoryController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GigController;
use App\Http\Controllers\Api\ProfileformController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\MessageController;
use Illuminate\Support\Facades\Auth;

use Pusher\Pusher;


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

Route::get('/jobs', [JobController::class, 'index']);
Route::post('/create-job', [JobController::class,'create']);
Route::post('/save-chat', [ChatHistoryController::class, 'saveChat']);
Route::get('/chat-history', [ChatHistoryController::class, 'getChatHistory']);
Route::post('/api/auth/google/callback', function (Request $request) {
    $name = $request->input('name');
    $email = $request->input('email');
    // Add other user information you want to store

    // Store user data in the database
    $user = User::firstOrCreate(['email' => $email], ['name' => $name]);

    return response()->json(['message' => 'User data stored successfully']);
});
Route::get('/users/devs', [UserController::class, 'index']);
Route::get('/projects/{projectId}', [ProjectController::class, 'show']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout']);
// routes/api.php
Route::get('/DisplayUser', [UserController::class, 'index']);
Route::get('/userprofile/{userId}', [UserController::class, 'show']);
// routes/web.php
use Illuminate\Support\Facades\Broadcast;
Broadcast::routes(['middleware' => ['auth:api']]);
use App\Http\Controllers\Api\ForgotPasswordController;

Route::post('/forgot-password', [ForgotPasswordController::class, 'forgot']);


use App\Http\Controllers\Api\ResetPasswordController;
// Password Reset Routes
Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');
Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');

Route::middleware('auth:sanctum')->get('/user-details', [UserController::class, 'userDetails']);

Route::post('projects/{projectId}/add-developer-request', [ProjectController::class, 'addDeveloperRequest']);

// Route to create a new project
Route::post('/createproject', [ProjectController::class, 'createproject'])->middleware('auth:sanctum');

// Route to display projects created by the authenticated user
Route::get('/user/projects', [ProjectController::class, 'userProjects'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/creategig', [GigController::class, 'store']);
    Route::post('projects/{projectId}/add-developer-request', [ProjectController::class, 'addDeveloperRequest']);
    Route::get('/user-requests', [ProjectDeveloperRequestController::class, 'getUserRequests']);
    Route::post('/projects/{project}/accept-developer-request', [ProjectController::class, 'acceptRequest']);
    Route::post('/projects/{project}/{developer}/decline-developer-request', [ProjectController::class, 'declineRequest']);
    Route::post('/createprofile',[GigController::class,'storeP']);
    Route::get('/usergigs', [GigController::class, 'getUserGigs']);
    Route::get('/messages/{recipientId}', [MessageController::class, 'fetchMessages']);
    Route::post('/messages', [MessageController::class, 'sendMessage']);
});
Route::get('/gigs', [GigController::class, 'index']);
Route::get('/usergigs/{userId}', [GigController::class, 'giginfo']);
// routes/web.php







Route::get('auth/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

Route::get('auth/facebook', [SocialiteController::class, 'redirectToFacebook']);
Route::get('auth/facebook/callback', [SocialiteController::class, 'handleFacebookCallback']);

