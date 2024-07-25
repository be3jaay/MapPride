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
            'description' => 'required|string|max:255',
            'url_link' => 'required|string|max:255',
        ]);

        $resources = Resources::create($validatedData);

        return response()->json($resources, 201);
    }
}
