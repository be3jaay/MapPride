<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tabs;

class TabsController extends Controller
{
    public function index()
    {
        $tabs = Tabs::all();
        return response()->json($tabs);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tabs_type' => 'required|string|max:255',
            'tabs_title' => 'required|string|max:255',
        ]);
    
        $tabs = Tabs::create($validatedData);
    
        return response()->json($tabs, 201);
    }

}
