<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectDeveloperRequest;
use App\Models\ProjectRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Pusher\Pusher;
use Illuminate\Support\Facades\Auth;
use App\Events\DeveloperRequestEvent;
class ProjectDeveloperRequestController extends Controller
{

    public function getUserRequests()
    {
        // Get authenticated user
        $user = Auth::user();
        $userId=$user->id;

        // Retrieve requests with project information
        $requests = ProjectRequest::where('developer_Id', $user->id)
            ->with('project') // Load the 'project' relationship
            ->get();
        $projectId =ProjectRequest::where('developer_Id', $user->id)
        ->get();

        return response()->json(['requests' => $requests,'userId'=>$userId,'projectId'=>$projectId]);
    }
    public function store(Request $request, Project $project)
    {
        $developerId = $request->input('developer_id');
        $developer = User::find($developerId);
    
        if ($developer && $developer->role === 'dev') {
            $projectDeveloperRequest = ProjectDeveloperRequest::create([
                'project_id' => $project->id,
                'developer_id' => $developerId,
                'status' => 'pending'
            ]);
    
            event(new DeveloperRequestEvent($project->id, $projectDeveloperRequest->id));
    
            return response()->json(['message' => 'Developer request sent successfully'], 200);
        } else {
            return response()->json(['message' => 'Invalid developer'], 400);
        }
    }

    public function respond(Request $request, ProjectDeveloperRequest $projectDeveloperRequest)
    {
        $status = $request->input('status'); // 'accepted' or 'declined'

        if (in_array($status, ['accepted', 'declined'])) {
            $projectDeveloperRequest->update(['status' => $status]);

            if ($status === 'accepted') {
                $projectDeveloperRequest->project->developers()->attach($projectDeveloperRequest->developer_id);
            }

            return response()->json(['message' => 'Request responded successfully'], 200);
        } else {
            return response()->json(['message' => 'Invalid status'], 400);
        }
    }
}
