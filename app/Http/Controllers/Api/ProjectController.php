<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Events\DeveloperRequestEvent;
use App\Events\DeveloperAcceptedEvent;
use App\Events\RequestDeclinedEvent;
use app\Notifications\DeveloperRequestNotification;
use function PHPSTORM_META\map;

class ProjectController extends Controller
{

    public function getTeamMembers($projectId)
    {
        $project = Project::with('users.profiles') // Eager load users and their profiles
            ->where('id', $projectId)
            ->first();

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // Extract users and their profiles
        $teamMembers = $project->users;

        return response()->json($teamMembers);
    }
    // show project details in pch 
    public function show($id)
    {
        $project = Project::leftJoin('users', 'projects.created_by', '=', 'users.id')
    ->select('projects.*', 'users.id as manager_id')
    ->find($id);

if ($project) {
    return response()->json([
        'id' => $id,
        'managerId' => $project->manager_id,
        'projectname' => $project->project_name,
        'projectDesc' => $project->description
    ]);
} else {
    return response()->json(['error' => 'Project not found'], 404);
}
    }
    // Method to create a new project
    public function createproject(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'end_date' => 'nullable|date',
        ]);

        // Create the project
        $project = new Project;
        $project->project_name = $request->title;
        $project->description = $request->description;
        $project->created_by = Auth::id(); // Use authenticated user's ID
        $project->end_date = $request->end_date;
        
        if ($request->hasFile('img')) {
            $imagePath = $request->file('img');
            $imageName= time().'.' . $imagePath->getClientOriginalExtension();
            $imagePath->move(public_path('images'),$imageName);
            $project->img = $imageName;
        }
        
        $project->save();

        // Return a response
        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project
        ], 201);
    }

    // Method to display projects created by the authenticated user
    public function userProjects()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Get the projects created by the user
        $projects = $user->createdProjects;

        // Return the projects
        return response()->json([
            'projects' => $projects
        ]);
    }

    // ProjectController.php

    
    public function addDeveloperRequest(Request $request, $projectId)
    {
        $request->validate([
            'developer_id' => 'required|exists:users,id',
        ]);
    
        $developerId = $request->input('developer_id');
        $project = Project::findOrFail($projectId);
    
        // Example: Get the current authenticated manager or user ID
        $managerId = $request->user()->id; // Assuming manager is the authenticated user
    
        // Create the project request
        ProjectRequest::create([
            'project_id' => $projectId,
            'developer_id' => $developerId,
        ]);
    
        // Send a notification to the developer on a private channel
        $message = "You have been requested to join the project: {$project->name}";
        broadcast(new DeveloperRequestEvent($developerId, $managerId, $message));
    
        return response()->json(['message' => 'Request sent successfully']);
    }

    public function acceptRequest($projectId, $developerId)
{
    // Add developer to project_user pivot
    $project = Project::findOrFail($projectId);
    $project->developers()->attach($developerId);

    // Delete the project request
    ProjectRequest::where('project_id', $projectId)
        ->where('developer_id', $developerId)
        ->delete();

    // Send notification to developer
    broadcast(new DeveloperAcceptedEvent($developerId, $project->name));

    return response()->json(['message' => 'Developer added to the project.']);
}

public function declineRequest($projectId, $developerId)
{
    // Delete the project request
    ProjectRequest::where('project_id', $projectId)
        ->where('developer_id', $developerId)
        ->delete();

    // Send notification to manager (assuming manager's ID is known or can be retrieved)
    $managerId = auth()->id(); // Adjust as per your authentication setup
    broadcast(new RequestDeclinedEvent($managerId, $developerId));

    return response()->json(['message' => 'Request declined.']);
}
    
}
