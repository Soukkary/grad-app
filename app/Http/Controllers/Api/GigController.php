<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gig;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class GigController extends Controller
{
    public function index()
    {
        // Eager load the 'user' relationship and filter by user ID
        $userId= Auth::id();
        $gigs = Gig::with('user')
                   ->where('user_id', $userId)
                   ->get();

        return response()->json($gigs);
    }
    public function getUserGigs($userId)
    {
        // Fetch gigs for the user
        $gigs = Gig::where('user_id', $userId)->get();

        if ($gigs->isEmpty()) {
            return response()->json(['error' => 'No gigs found for this user'], 404);
        }

        return response()->json($gigs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  
        ]);

        $job = new Gig;
        $job->title = $request->title;
        $job->description = $request->description;
        $job->user_id = $request->user()->id; // Use authenticated user's ID

        if ($request->hasFile('img')) {
            $imagePath = $request->file('img')->store('images', 'public');
            $job->img = $imagePath;
        }

        $job->save();

        return response()->json(['message' => 'Job created successfully'], 201);
    }
    public function storeP(Request $request)
{
    $request->validate([
        'education' => 'nullable|string',
        'experience' => 'nullable|string',
        'profile_picture' => 'nullable|image',
        'skills' => 'nullable|string',
        'fields' => 'nullable|string',
    ]);

    $profileData = $request->only('education', 'experience', 'skills', 'fields');
    
    if ($request->hasFile('profile_picture')) {
        $path = $request->file('profile_picture')->store('profile_pics', 'public');
        $profileData['profile_pic'] = $path;
    }

    $userId = Auth::id();

    if (!$userId) {
        return response()->json([
            'message' => 'User not authenticated'
        ], 401);
    }

    // Log the user ID
    Log::info('Authenticated user ID: ' . $userId);

    // Check if the user ID exists in the users table
    if (!User::find($userId)) {
        return response()->json([
            'message' => 'User does not exist'
        ], 400);
    }

    $profileData['user_id'] = $userId;

    try {
        $profile = Profile::create($profileData);
        return response()->json([
            'message' => 'Profile created successfully',
            'profile' => $profile,
        ], 201);
    } catch (\Exception $e) {
        Log::error('Error creating profile: ' . $e->getMessage()); // Log the error
        return response()->json([
            'message' => 'Error creating profile',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}
