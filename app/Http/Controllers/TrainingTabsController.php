<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainingTabs;

class TrainingTabsController extends Controller
{
    public function index()
    {
        $tabs_training = TrainingTabs::all();
        return response()->json($tabs_training);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tabs_type' => 'required|string|max:255',
            'tabs_title' => 'required|string|max:255',
        ]);
    
        $tabs_training = TrainingTabs::create($validatedData);
    
        return response()->json($tabs_training, 201);
    }
}
