<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;
use Illuminate\Support\Facades\Validator;

class TrainingController extends Controller
{
    public function index()
    {
        $perPage = 10;
        $training = Training::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($training);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tabs_title' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'url_link' => 'required|string|max:255',
        ]);

        $training = Training::create($validatedData);

        return response()->json($training, 201);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'tabs_title' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'url_link' => 'required|string|max:255',
        ]);

        // Find the training record
        $training = Training::find($id);
        if (!$training) {
            return response()->json(['message' => 'Training content not found'], 404);
        }

        // Update the training record with validated data
        $training->update($validatedData);

        return response()->json($training, 200);
    }

    public function destroy(Request $request, $id)
    {
        $training = Training::find($id);
        if (!$training) {
            return response()->json(['message' => 'Training content not found'], 404);
        }

        $training->delete();
        return response()->json($training, 200);
    }
}
