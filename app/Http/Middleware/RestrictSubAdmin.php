<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\AdminsRole;
use Illuminate\Support\Facades\Auth;

class RestrictSubAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authorized to access the URL
        if (Auth::guard('admin')->user()->type !== 'Super-Admin') {
            abort(403, 'Unauthorized action.');
        }
        return $next($request);
    }
}
