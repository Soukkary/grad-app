<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
         Schema::defaultStringLength(191);
         Validator::extend('alpha_spaces', function ($attribute, $value) {
            // Allow alphabetic characters and spaces
            return preg_match('/^[\pL\s]+$/u', $value);
            
        });
    }
}
