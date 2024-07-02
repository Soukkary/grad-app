<?php

namespace App\Events;

use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $taskId;
    public $description;
    public $userId;
    public $userName;
    public $projectId;
    public $due_date;

    /**
     * Create a new event instance.
     *
     * @param Task $task
     */
    public function __construct(Task $task)
    {
        $this->taskId = $task->id;
        $this->description = $task->description;
        $this->due_date=$task->due_date;
        $this->userId = $task->users->pluck('id')->toArray();
        $this->userName = $task->users->pluck('name')->toArray();
        $this->projectId = $task->project_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('project.' . $this->projectId);
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'taskId' => $this->taskId,
            'description' => $this->description,
            'userId' => $this->userId,
            'userName' => $this->userName,
            'dueDate'=>$this->due_date
        ];
    }
}
