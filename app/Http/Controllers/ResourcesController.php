<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resources;

class ResourcesController extends Controller
{
    public function index()
    {
        $perPage = 10;
        $resources = Resources::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($resources);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tabs_title' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'author' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'url_link' => 'required|string|max:255',
        ]);

        $resources = Resources::create($validatedData);

        return response()->json($resources, 201);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'tabs_title' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'author' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'url_link' => 'required|string|max:255',
        ]);

        // Find the training record
        $resources = Resources::find($id);
        if (!$resources) {
            return response()->json(['message' => 'Resources content not found'], 404);
        }

        // Update the training record with validated data
        $resources->update($validatedData);

        return response()->json(['message' => 'Resources content updated successfully', 'resources' => $resources], 200);
    }

    public function destroy(Request $request, $id)
    {
        $resources = Resources::find($id);
        if (!$resources) {
            return response()->json(['message' => 'Resources content not found'], 404);
        }

        $resources->delete();
        return response()->json($resources, 200);
    }
}
