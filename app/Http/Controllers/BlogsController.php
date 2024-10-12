<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Storage;
use Cloudinary\Cloudinary;

class BlogsController extends Controller
{
    protected $cloudinary;

    public function __construct(Cloudinary $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

    public function index()
    {
        $perPage = 30;
        $blogs = Blogs::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($blogs);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|file|mimes:jpeg,png,gif|max:2048',
            'icon' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $result = $this->cloudinary->uploadApi()->upload($image->getRealPath(), [
                'folder' => 'blog_images',
            ]);
            $validatedData['image'] = $result['secure_url'];
        }

        $blogs = Blogs::create($validatedData);

        return response()->json($blogs, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog = Blogs::with('comments')->findOrFail($id);
        return response()->json($blog);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blogs = Blogs::findOrFail($id);
        $blogs->delete();

        return response()->json(null, 204);
    }

    public function storeComment(Request $request, $blogId)
    {
        $validatedData = $request->validate([
            'username' => 'required|string',
            'content' => 'required|string',
            'icon' => 'required|string',
        ]);

        $comment = Comment::create([
            'blog_id' => $blogId,
            'username' => $validatedData['username'],
            'content' => $validatedData['content'],
            'icon' => $validatedData['icon'],
        ]);

        return response()->json($comment, 201);
    }

    public function showComments($blogId)
    {
        $comments = Comment::where('blog_id', $blogId)->get();
        return response()->json($comments);
    }
}
