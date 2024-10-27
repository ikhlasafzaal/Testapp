<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     $event = Event::all()->latest()->get();
    //     return Inertia::render('Dashboard/Event/Index',$event);
    // }

    public function index()
{
    // $event = [
    //     [
    //         'id' => 1,
    //         'name' => "Bina Khan",
    //         'email' => "khan.bina@gmail.com",
    //         'work_info' => "Software Engineer",
    //         'phone' => "0300 291991000",
    //         'tag' => "1"
    //     ],
    //     [
    //         'id' => 2,
    //         'name' => "Bina Khan",
    //         'email' => "khan.bina@gmail.com",
    //         'work_info' => "Project Manager",
    //         'phone' => "504-845-1427",
    //         'tag' => "2"
    //     ],
    // ];
    $event = Event::all();


    return Inertia::render('Dashboard/Event/Index', ['events' => $event]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Event/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $category = Event::create($request->validated());

        return redirect()->route('dashboard.events.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}
