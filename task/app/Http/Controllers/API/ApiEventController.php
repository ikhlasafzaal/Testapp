<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;

class ApiEventController extends Controller
{
    public function index()
    {
        $events = Event::latest()->get();
        return response()->json($events);
    }
}
