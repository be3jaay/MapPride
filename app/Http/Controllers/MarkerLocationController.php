<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MarkerLocations;
use Illuminate\Support\Facades\Storage;

class MarkerLocationController extends Controller
{
    public function index()
{
    $perPage = 10; 
    $marker_locations = MarkerLocations::with('services')->orderBy('created_at', 'desc')->paginate($perPage);
    return response()->json($marker_locations);
}


    public function store(Request $request)
{
    $validatedData = $request->validate([
        'location' => 'required|string',
        'longitude' => 'required|numeric',
        'latitude' => 'required|numeric',
        'location_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'location_title' => 'required|string',
        'location_description' => 'required|string',
        'location_services' => 'required|array',
    ]);

    if ($request->hasFile('location_image')) {
        $image = $request->file('location_image');
        $imagePath = $image->store('location_images', 'public');
        $validatedData['location_image'] = $imagePath;
    }

    // Create the marker location
    $marker_location = MarkerLocations::create($validatedData);

    // Insert location services
    foreach ($request->input('location_services') as $service) {
        $marker_location->services()->create(['service_name' => $service]);
    }

    return response()->json($marker_location, 201);
}
}


