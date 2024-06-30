<?php
// app/Listeners/BroadcastMessageSent.php

namespace App\Listeners;

use App\Events\MessageSent;

class BroadcastMessageSent
{
    public function handle(MessageSent $event)
    {
        broadcast(new MessageSent($event->message))->toOthers();
    }
}