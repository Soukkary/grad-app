<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;



use App\Models\Job;

use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    /**
     * Display a listing of the jobs.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all jobs
        $jobs = Job::all();
        return view('jobs.index', ['jobs' => $jobs]);
    }

    /**
     * Show the form for creating a new job.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('jobs.create');
    }

    /**
     * Store a newly created job in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createjob(Request $request)
    {
        // Validate request data
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Create a new job instance
        $job = new Job();
        $job->title = $request->title;
        $job->description = $request->description;
        // Associate job with authenticated user
        $job->save();

        // Redirect to a route or return a response
        return redirect()->route('jobs.index')->with('success', 'Job created successfully.');
    }

    /**
     * Remove the specified job from storage.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        // Check if the authenticated user is authorized to delete the job
        if (Auth::id() !== $job->user_id) {
            return redirect()->back()->with('error', 'You are not authorized to delete this job.');
        }

        // Delete the job
        $job->delete();

        // Redirect to a route or return a response
        return redirect()->route('jobs.index')->with('success', 'Job deleted successfully.');
    }
}

