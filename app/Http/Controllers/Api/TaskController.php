<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Events\TaskCreated;
use App\Events\TaskEvent;
use App\Events\TaskUpdated;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks.
     *
     * @param  int  $projectId
     * @return \Illuminate\Http\Response
     */
    public function index($projectId)
    {
        // Validate that the projectId is an integer
        if (!is_numeric($projectId)) {
            return response()->json(['error' => 'Invalid project ID'], 400);
        }

        // Fetch tasks related to the projectId with \ed user details
        $tasks = Task::with('users:id,name')
            ->where('project_id', $projectId)
            ->get();

        // Check if tasks exist
        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'No tasks found for this project'], 404);
        }

        // Return tasks as a JSON response
        return response()->json($tasks);
    }
    // Method to create a new task
    public function store(Request $request, $projectId)
    {
        // Validate incoming request data
        $request->validate([
            'description' => 'required|string',
            'dueDate' => 'required|date',
            'user_id'=> 'required',
            // Other validation rules
        ]);

        // Create a new task
        $task = new Task([
            'description' => $request->input('description'),
            'due_date' => $request->input('dueDate'),
            'project_id' => $projectId,
            'status'=>'pending' // Assuming project_id is passed from the route or request
        ]);

        // Save the task
        $task->save();

        // Assign users to the task (if any users were selected)
        if ($request->has('user_id')) {
            $userIds = $request->input('user_id');
            $task->users()->attach($userIds);
        }
        
        // Broadcast event to update frontend in real-time
        broadcast(new TaskEvent($task))->toOthers();

        // Optionally, return response or redirect as needed
        return response()->json(['message' => 'Task created successfully', 'task' => $task], 201);
    }

    // Method to update a task
    public function update(Request $request, $taskId)
    {
        // Find the task
        $task = Task::findOrFail($taskId);

        // Validate incoming request data
        $request->validate([
            'description' => 'string',
            'due_date' => 'date',
            // Other validation rules
        ]);

        // Update task attributes
        $task->description = $request->input('description', $task->description);
        $task->due_date = $request->input('due_date', $task->due_date);

        // Save the updated task
        $task->save();

        // Sync users to the task (if any users were selected)
        if ($request->has('user_ids')) {
            $userIds = $request->input('user_ids');
            $task->users()->sync($userIds);
        }

        // Broadcast event to update frontend in real-time
        broadcast(new TaskUpdated($task))->toOthers();

        // Optionally, return response or redirect as needed
        return response()->json(['message' => 'Task updated successfully', 'task' => $task], 200);
    }

    // Method to delete a task
    public function destroy($taskId)
    {
        // Find the task
        $task = Task::findOrFail($taskId);

        // Detach all users from the task
        $task->users()->detach();

        // Delete the task
        $task->delete();

        // Optionally, return response or redirect as needed
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
