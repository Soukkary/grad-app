<?php
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class DeveloperAdded extends Notification
{
    private $projectId;
    private $projectName;

    public function __construct($projectId, $projectName)
    {
        $this->projectId = $projectId;
        $this->projectName = $projectName;
    }

    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'projectId' => $this->projectId,
            'projectName' => $this->projectName,
        ]);
    }
}
