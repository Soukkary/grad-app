<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Api\SocialiteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/register', 'AuthController@register');
Auth::routes(['verify'=>true]);

Route::get('auth/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

Route::get('auth/facebook', [SocialiteController::class, 'redirectToFacebook']);
Route::get('auth/facebook/callback', [SocialiteController::class, 'handleFacebookCallback']);

Route::prefix('/admin')->namespace('App\Http\Controllers\Admin')->group(function() {
    Route::match(['get', 'post'], 'login', [AdminController::class, 'login']);
    Route::group(['middleware'=>['isadmin']], function() {
        Route::get('dashboard', [AdminController::class, 'dashboard']);
        Route::get('logout', [AdminController::class, 'logout']);
        Route::match(['get', 'post'], 'update-password', [AdminController::class, 'updatePassword']);
        Route::match(['get', 'post'], 'update-admin', [AdminController::class, 'updateAdmin']);
        Route::post('check-current-password', [AdminController::class, 'checkCurrentPass']);

        //SubAdmins
        Route::group(['middleware'=>['restrict.subadmin']], function() {
            Route::get('subadmins', [AdminController::class, 'subadmins']);
            Route::post('update-subadmin-status', [AdminController::class, 'updateSubadminStatus']);
            Route::match(['get', 'post'], 'add-edit-subadmin/{id?}', [AdminController::class, 'addEditSubadmin']);
            Route::get('delete-subadmin/{id?}/{type?}', [AdminController::class, 'deleteSubadmin']);
            Route::match(['get', 'post'], 'update-role/{id?}', [AdminController::class, 'updateRole']);
        });

        //Manage users info
        Route::get('users-data', [AdminController::class, 'usersData']);
        Route::get('delete-user/{id?}/{module?}', [AdminController::class, 'deleteUser'])->middleware('restrict.delete');
        Route::match(['get', 'post'], 'add-edit-user-data/{id?}/{module?}', [AdminController::class, 'addEditUserData'])->middleware('restrict.addedit');;

        //Notes
        Route::get('notes', [AdminController::class, 'notesPage']);
        Route::match(['get', 'post'], 'add-edit-note/{id?}', [AdminController::class, 'addEditNote']);
        Route::get('delete-note/{id?}/{title?}', [AdminController::class, 'deleteNote']);
        Route::get('view-note/{id?}', [AdminController::class, 'viewNote']);

        //Payout
        Route::get('payout', [AdminController::class, 'payoutPage']);
    });
});
