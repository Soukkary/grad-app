<?
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // Import the Log facade
use App\Http\Controllers\Controller;

class ProfileformController extends Controller
{

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

        $userId = $request->user()->id;
        

        if (!$userId) {
            return response()->json([
                'message' => 'User not authenticated'
            ], 401);
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

    public function update(Request $request)
    {
        $request->validate([
            'education' => 'nullable|string',
            'experience' => 'nullable|string',
            'profile_picture' => 'nullable|image',
            'skills' => 'nullable|string',
            'fields' => 'nullable|string',
        ]);

        $profile = Auth::user()->profile;
        $profileData = $request->only('education', 'experience', 'skills', 'fields');

        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($profile->profile_pic) {
                Storage::disk('public')->delete($profile->profile_pic);
            }

            $path = $request->file('profile_picture')->store('profile_pics', 'public');
            $profileData['profile_pic'] = $path;
        }

        try {
            $profile->update($profileData);
            return response()->json([
                'message' => 'Profile updated successfully',
                'profile' => $profile,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating profile: ' . $e->getMessage()); // Log the error
            return response()->json([
                'message' => 'Error updating profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
