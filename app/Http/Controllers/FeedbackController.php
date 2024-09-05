<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function index()
    {
        $perPage = 10; 
        $feedback = Feedback::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($feedback);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'feedback_value' => 'required|integer',
            'description' => 'required|string',
        ]);

        $feedback = Feedback::create($validatedData);

        return response()->json($feedback, 201);
    }

    public function destroy(Request $request, $id)
    {
        $feedback = Feedback::find($id);
        if (!$feedback) {
            return response()->json(['message' => 'Feedback content not found'], 404);
        }

        $feedback->delete();
        
        return response()->json($feedback, 200);
    }

}
