<?php

namespace App\Events;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class DeveloperRequestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $developerId;
    public $managerId;
    public $message;

    public function __construct($developerId, $managerId, $message)
    {
        $this->developerId = $developerId;
        $this->managerId = $managerId; // Store manager ID
        $this->message = $message;
    }
    
    public function broadcastOn()
    {
        // Formulate a private channel between manager and developer
        return new Channel('developer-request.' . $this->developerId);
    }
    
}
