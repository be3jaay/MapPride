<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SupportController extends Controller
{
    //

    public function index()
    {
        $perPage = 10; 
        $support = Feedback::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($support);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'phoneNumber' => 'required|integer'
        ]);

        $support = Feedback::create($validatedData);

        return response()->json($support, 201);
    }
}
