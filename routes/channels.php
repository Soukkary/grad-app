<?php

use Illuminate\Support\Facades\Broadcast;
use app\Models\Message;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

//Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
  //  return (int) $user->id === (int) $id;
    
//});

Broadcast::channel('chat.{recipientId}', function ($user, $recipientId) {
    return (int) $user->id === (int) $recipientId || (int) $user->id === (int) auth()->id();
});
Broadcast::channel('developer-request.{developerId}', function ($user, $developerId) {
  // Allow access if the authenticated user is the developer or the manager who sent the request
  return (int) $user->id === (int) $developerId || (int) $user->id === (int) auth()->id();
});


Broadcast::channel('developer.{developerId}', function ($user, $developerId) {
  // Allow access if the authenticated user is the developer or the manager who sent the request
  return (int) $user->id === (int) $developerId || (int) $user->id === (int) auth()->id();
});
Broadcast::channel('manager.{managerId}', function ($user, $managerId) {
  // Allow authenticated user to subscribe to private channel for specific managerId
  return (int) $user->id === (int) $managerId;
});

