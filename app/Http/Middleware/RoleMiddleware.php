<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * Usage: ->middleware([\App\Http\Middleware\RoleMiddleware::class . ':admin'])
     */
    public function handle(Request $request, Closure $next, $role = null)
    {
        $user = $request->user();

        if (!$user) {
            return redirect('/login');
        }

        // If no role specified, allow
        if (!$role) {
            return $next($request);
        }

        // Roles can be comma-separated
        $allowed = array_map('trim', explode(',', $role));

        if (!in_array($user->role, $allowed)) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
