<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainingTabs;

class TrainingTabsController extends Controller
{
    public function index()
    {
        $tabs_trainings = TrainingTabs::all();
        return response()->json($tabs_trainings);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tabs_type' => 'required|string|max:255',
            'tabs_title' => 'required|string|max:255',
        ]);
    
        $tabs_trainings = TrainingTabs::create($validatedData);
    
        return response()->json($tabs_trainings, 201);
    }
}
