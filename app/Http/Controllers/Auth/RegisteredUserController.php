<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Cloudinary\Cloudinary;

class RegisteredUserController extends Controller
{
    protected $cloudinary;

    public function __construct(Cloudinary $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }
    // ... other methods ...
    public function index()
    {
        $perPage = 10;
        $users = User::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($users);
    }

    

    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'preferences' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,gif|max:2048',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'preferences' => $request->preferences,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
        ];

        // Upload profile picture to Cloudinary if it exists
        if ($request->hasFile('profile_picture')) {
            $profilePicture = $request->file('profile_picture');
            $result = $this->cloudinary->uploadApi()->upload($profilePicture->getRealPath(), [
                'folder' => 'profile_pictures', // Specify the folder in Cloudinary
            ]);
            $userData['profile_picture'] = $result['secure_url']; // Get the secure URL of the uploaded image
        }

        $user = User::create($userData);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'preferences' => 'required|string|max:255',
            'gender' => 'required|string|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,gif|max:2048',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $id,
        ]);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'preferences' => $request->preferences,
            'gender' => $request->gender,
        ];

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($user->profile_picture) {
                // You may want to delete the old image from Cloudinary if needed
                // This requires the public ID of the image, which you can extract from the URL
                $publicId = basename(parse_url($user->profile_picture, PHP_URL_PATH));
                $this->cloudinary->deleteApi()->delete($publicId);
            }
            $profilePicture = $request->file('profile_picture');
            $result = $this->cloudinary->uploadApi()->upload($profilePicture->getRealPath(), [
                'folder' => 'profile_pictures',
            ]);
            $userData['profile_picture'] = $result['secure_url'];
        }

        $user->update($userData);

        return response()->json($user->fresh(), 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        // Delete associated files from Cloudinary
        if ($user->profile_picture) {
            $publicId = basename(parse_url($user->profile_picture, PHP_URL_PATH));
            $this->cloudinary->deleteApi()->delete($publicId);
        }

        $user->delete();

        return response()->json(null, 204);
    }

    
    public function show()
    {
        $perPage = 1000;
        $user = User::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($user);
    }
}
