<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotline;

class HotlineController extends Controller
{
    //
    public function index()
    {
        $perPage = 10; 
        $hotline = Hotline::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($hotline);
    }

    public function store(Request $request)
    {
        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'phoneNumber' => 'required|integer|max:99999999999'
        ]);

        $hotline = Hotline::create($validateData);

        return response()->json($hotline, 201);
    }

    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'phoneNumber' => 'required|integer'
        ]);

        $hotline = Hotline::find($id);

        if (!$hotline) {
            return response()->json(['message' => 'Hotline content not found'], 404);
        }

        $hotline->update($validateData);
        
        return response()->json($hotline, 200);
    }

    public function destroy(Request $request, $id)
    {
        $hotline = Hotline::find($id);

        if(!$hotline)
        {
            return response()->json(['message' => 'Hotline content not found'], 404);
        }
        $hotline->delete();
        return response()->json($hotline, 200);
    }

}
