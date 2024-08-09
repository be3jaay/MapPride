<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MapSelection;

class MapSelectionController extends Controller
{
    //
    public function index()
    {
        $perPage = 10; 
        $map_selection = MapSelection::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($map_selection);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'location' => 'required|string|max:255',
        ]);

        $map_selection = MapSelection::create($validatedData);

        return response()->json($map_selection, 201);
    }
}
