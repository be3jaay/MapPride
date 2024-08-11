<?php

namespace App\Http\Controllers;

use App\Models\Map;
use Illuminate\Http\Request;


class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maps = Map::all();
        return response()->json($maps);
    }


    public function store(Request $request)
{
    $validatedData = $request->validate([
        'location' => 'required|string',
        'longitude' => 'required|numeric',
        'latitude' => 'required|numeric',
        'image' => 'nullable|file|mimes:jpeg,png,gif|max:2048',
        'title' => 'required|string',
        'description' => 'required|string',
        'address' => 'required|string',
        'phone' => 'nullable|string',
        'services' => 'nullable|array',
    ]);

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('public/images');
        $validatedData['image'] = basename($imagePath);
    }

    $map = Map::create($validatedData);
    return response()->json($map, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $map = Map::findOrFail($id);
        return response()->json($map);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $map = Map::findOrFail($id);
        // Return a view for editing the map (if using Blade templates)
        return view('maps.edit', compact('map'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'location' => 'required|string',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'image' => 'nullable|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|integer|max:99999999999',
            'services' => 'nullable',
             // Allow either array or string; handled in model
        ]);

        $map = Map::findOrFail($id);
        $map->update($validatedData);

        return response()->json($map);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $map = Map::findOrFail($id);
        $map->delete();

        return response()->json(null, 204);
    }
}

