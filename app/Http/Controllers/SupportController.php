<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SupportController extends Controller
{
    public function index()
    {
        $perPage = 10; 
        $support = Support::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($support);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'phoneNumber' => 'required|integer',
        ]);

        $support = Support::create($validatedData);

        return response()->json($support, 201);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'phoneNumber' => 'required|integer',
        ]);

        // Find the training record
        $support = Support::find($id);
        if (!$support) {
            return response()->json(['message' => 'Support content not found'], 404);
        }

        // Update the training record with validated data
        $support->update($validatedData);

        return response()->json(['message' => 'Support content updated successfully', 'support' => $support], 200);
    }
}
