<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // Specify the primary key
    protected $primaryKey = 'id';

    // Specify the table if it's different from the model name in plural
    protected $table = 'projects';

    // Specify the attributes that are mass assignable
    protected $fillable = [
        'project_name',
        'description',
        'img',
        'end_date',
        'created_by',
    ];

    // Specify the attributes that should be cast
    protected $casts = [
        'end_date' => 'date',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * The users that are assigned to the project.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user', 'project_id', 'user_id')
                    ->using(ProjectUser::class)
                    ->withTimestamps();
    }
    
    public function developers()
    {
        return $this->belongsToMany(User::class, 'project_user', 'project_id', 'user_id')
        ->using(ProjectUser::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    
public function developerRequests()
{
    return $this->hasMany(ProjectDeveloperRequest::class);
}

}
