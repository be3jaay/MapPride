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
}
