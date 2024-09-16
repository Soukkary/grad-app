<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
<<<<<<< Updated upstream
        'user_id',
        'title',
        'description',
        'orgName',
        'level',
        'job_type',
        'img',
    ];
}
=======
        'title',
        'description',
        'organization_name',
        'level',
        'job_type',
    ];
}
>>>>>>> Stashed changes
