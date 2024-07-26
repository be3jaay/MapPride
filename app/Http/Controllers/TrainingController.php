<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;

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
}
