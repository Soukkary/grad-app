<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        // Headers you want to allow
        $headers = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-CSRF-TOKEN, Origin, Accept, Accept-Language, Cache-Control, If-None-Match, If-Match, Range, User-Agent, Cookie, Referer, Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site',

        ];

        // Handle preflight OPTIONS requests
        if ($request->getMethod() === 'OPTIONS') {
            // Send an empty response with 200 status code
            return response()->json('OK', 200, $headers);
        }

        // Pass the request to the next middleware
        $response = $next($request);

        // Add headers to the response
        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }

        // Return the response
        return $response;
    }
}
