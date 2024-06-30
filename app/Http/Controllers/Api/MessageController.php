<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\Message;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
{
    // Validate and save the message
    $message = Message::create([
        'sender_id' => $request->user()->id,
        'recipient_id' => $request->recipient_id,
        'message' => $request->message,
    ]);

    // Broadcast the message
    broadcast(new MessageSent($message))->toOthers();

    return response()->json(['status' => 'Message Sent!']);
}

public function fetchMessages($recipientId)
{
    $userId = Auth::id();

    $messages = Message::where(function($query) use ($userId, $recipientId) {
        $query->where('sender_id', $userId)
              ->where('recipient_id', $recipientId);
    })->orWhere(function($query) use ($userId, $recipientId) {
        $query->where('sender_id', $recipientId)
              ->where('recipient_id', $userId);
    })->orderBy('created_at', 'asc')
      ->get();

    return response()->json($messages);
}
    

}
