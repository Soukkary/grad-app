<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RequestDeclinedEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $managerId;
    public $developerId;

    public function __construct($managerId, $developerId)
    {
        $this->managerId = $managerId;
        $this->developerId = $developerId;
    }

    public function broadcastOn()
    {
        return new Channel('manager.' . $this->managerId);
    }
}
