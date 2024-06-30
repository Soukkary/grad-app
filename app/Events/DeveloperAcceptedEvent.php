<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeveloperAcceptedEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $developerId;
    public $projectName;

    public function __construct($developerId, $projectName)
    {
        $this->developerId = $developerId;
        $this->projectName = $projectName;
    }

    public function broadcastOn()
    {
        return new Channel('developer.' . $this->developerId);
    }
}
