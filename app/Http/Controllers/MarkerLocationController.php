<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MarkerLocations;

class MarkerLocationController extends Controller
{
    //
    public function index()
    {
        $perPage = 10; 
        $marker_locations = MarkerLocations::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($marker_locations);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'location' => 'required|string|max:255',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
        ]);

        $marker_locations = MarkerLocations::create($validatedData);

        return response()->json($marker_locations, 201);
    }
}

