<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChatHistory;
use Illuminate\Support\Facades\Auth;

class ChatHistoryController extends Controller
{
    public function saveChat(Request $request)
    {
        $chatHistory = ChatHistory::create([
            //'user_id' => Auth::id(),
            'message' => $request->message,
            'response' => $request->response,
        ]);

        return response()->json($chatHistory, 201);
    }

    public function getChatHistory()
    {
        $chatHistory = ChatHistory::all();
        return response()->json($chatHistory);
    }
}
