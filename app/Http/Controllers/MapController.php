<?php

namespace App\Http\Controllers;

use App\Models\Map;
use Illuminate\Http\Request;
use App\Models\Rating;
use Illuminate\Support\Facades\DB;

class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = 10;
        $maps = Map::with('ratings')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        // Calculate average rating for each map
        $maps->getCollection()->transform(function ($map) {
            $map->average_rating = $map->ratings()->avg('rating_value');
            return $map;
        });

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
            'phone' => 'required|integer|max:999999999',
            'services' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            // Save the file in the 'images' directory within 'public'
            $imagePath = $image->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        $validatedData['services'] = json_decode($validatedData['services'], true);

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
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'location' => 'required|string',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'image' => 'nullable|file|mimes:jpeg,png,gif|max:2048',
            'title' => 'required|string',
            'description' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|integer|max:999999999',
            'services' => 'nullable|string',
        ]);

        $map = Map::findOrFail($id);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        // Decode services if present
        if (isset($validatedData['services'])) {
            $validatedData['services'] = json_decode($validatedData['services'], true);
        }

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

    public function rate(Request $request, $id)
    {
        $validatedData = $request->validate([
            'rating_value' => 'required|integer|min:1|max:5',
        ]);

        $map = Map::findOrFail($id);
        $rating = new Rating($validatedData);
        $map->ratings()->save($rating);

        return response()->json(['message' => 'Rating submitted successfully.'], 201);
    }

    /**
     * Display the average rating for the specified resource.
     */
    public function averageRating(string $id)
    {
        $map = Map::findOrFail($id);
        $averageRating = $map->ratings()->avg('rating_value'); // Calculate average rating

        return response()->json(['average_rating' => $averageRating]);
    }

    public function getHighestRatedMap()
    {
        $highestRatedMap = Map::select('maps.*', DB::raw('AVG(ratings.rating_value) as average_rating'))
            ->leftJoin('ratings', 'maps.id', '=', 'ratings.map_id')
            ->groupBy('maps.id', 'maps.location', 'maps.longitude', 'maps.latitude', 'maps.image', 'maps.title', 'maps.description', 'maps.address', 'maps.phone', 'maps.services', 'maps.created_at', 'maps.updated_at')
            ->orderByDesc('average_rating')
            ->first();

        if ($highestRatedMap) {
            $highestRatedMap->average_rating = round($highestRatedMap->average_rating, 2);
        }

        return response()->json(['highest_rated_map' => $highestRatedMap]);
    }
}
