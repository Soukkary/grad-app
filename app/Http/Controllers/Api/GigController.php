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
    public function index(Request $request)
    {
        // Eager load the 'user' relationship and filter by user ID
        $userId = Auth::id();
        $perPage = 10;
    
        $query = Gig::with('user', 'user.profiles');
                   
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                  ->orWhereHas('user', function($q) use ($search) {
                      $q->where('name', 'like', "%$search%");
                  });
            });
        }
    
            
                $gigs = $query->simplePaginate($perPage);
            
    
                   $formattedGigs = $gigs->items();
                   $formattedGigs = array_map(function ($gig) {
                       return [
                           'id' => $gig->id,
                           'gigname' => $gig->title,
                           'image' => $gig->img,
                           'freelancerImage' => optional($gig->user->profile)->profile_pic ?? null,
                           'freelancerName' => $gig->user->name,
                           'desc' => $gig->description,
                       ];
                   }, $formattedGigs);
      
        
    
        return response()->json([
            'gigs' => $formattedGigs,
            'currentPage' => $gigs->currentPage(),
          
        ]);
    }
    public function giginfo($userId)
    {
        try {
            // Fetch gigs associated with the user
            $gigs = Gig::where('user_id', $userId)->get();

            // Check if gigs exist for the user
            if ($gigs->isEmpty()) {
                return response()->json([
                    'message' => 'No gigs found for this user.',
                ], 404);
            }

            // Return the gigs as JSON response
            return response()->json($gigs, 200);
        } catch (\Exception $e) {
            // Handle any potential errors
            return response()->json([
                'message' => 'Error fetching gigs.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getUserGigs()
    {
        // Fetch gigs for the user
        $user = Auth::user();

        // Get the gigs created by the user
        $gigs = $user->gigs;

        // Return the gigs
        return response()->json([
            'gigs' => $gigs,
            'userId' =>$user->id
        ]);
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
            $imagePath = $request->file('img');
            $imageName= time().'.' . $imagePath->getClientOriginalExtension();
            $imagePath->move(public_path('images'),$imageName);
            $job->img = $imageName;
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
