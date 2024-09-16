<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    */
    public function userDetails(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            // Add any other user details you want to return
        ]);
    }
    public function indexDevsWithProfiles()
{
    // Fetch users with role 'dev' and their profiles
     // Fetch users with role 'dev' and eager load their profiles
     $users = User::where('role', 'dev')->with('profiles')->get();

     // Filter out users without profiles or with issues
     $filteredUsers = $users->filter(function ($user) {
         return $user->profile !== null;
     });

     return response()->json($filteredUsers);
}
    public function index()
    {
        // Fetch users with their profiles using left join
        $users = User::where('role','=','dev')
        ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id')
                    ->select('users.*', 'profiles.profile_pic', 'profiles.fields')
                    ->get();

        return response()->json($users);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data=$request->validated();
        $data['password']=bcrypt($data['password']);
        $user=User::create($data);
        return response( new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     */
    public function show($userId)
{
    $user = User::with('profiles')->find($userId);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $profiles = $user->profiles;

    return response()->json([
        'name' => $user->name,
        'initials' => strtoupper(substr($user->name, 0, 2)),
        'title' => $profiles->fields,
        
        'skills' => $profiles->skills, // assuming this is a collection or array
        'experience' => $profiles->experience, // assuming this is a collection or array
         // assuming this is a collection or array
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
        $data = $request-> validated();
        if(isset($data[ 'password' ])) {
            $data[ 'password'] = bcrypt ($data[ 'password' ]);
}
        $user -> update($data);
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user->delete();

            return response('',204);
    }
}
