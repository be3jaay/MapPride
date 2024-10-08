<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;

class ExperienceController extends Controller
{
    public function index()
    {
        $perPage = 10; 
        $experiences = Experience::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($experiences);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'experience_type' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $experience = Experience::create($validatedData);

        return response()->json($experience, 201);
    }
}
