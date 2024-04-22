<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\AdminsRole;
use Illuminate\Support\Facades\Auth;

class RestrictDeleteFunction
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $module=$request->module;
        $adminsRole = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id, 'module'=>$module])->first();
        if(!$adminsRole || $adminsRole->full_access == 0) {
            abort(403, 'Unauthorized action.');
        }
        return $next($request);
    }
}
