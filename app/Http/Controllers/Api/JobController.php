<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;



use App\Models\Job;

use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function create(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'orgName' => 'required|string',
            'level' => 'required|string',
            'job_type' => 'required|string',
            'img' => 'nullable|image',
        ]);

        // Create a new job record
        $job = new Job();
        $job->title = $validatedData['title'];
        $job->description = $validatedData['description'];
        $job->orgName = $validatedData['orgName'];
        $job->level = $validatedData['level'];
        $job->job_type = $validatedData['job_type'];
        // Handle image upload
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $job->img = $imageName;
        }
        $job->save();

        return response()->json(['message' => 'Job created successfully', 'job' => $job], 201);
    }

    public function index()
    {
        $jobs = Job::all();
        return response()->json($jobs);
    }
}

