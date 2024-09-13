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

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
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
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048'
        ]);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'preferences' => $request->preferences,
            'gender' => $request->gender,
            'password' => Hash::make($request->password),
        ];

        if ($request->hasFile('profile_picture')) {
            $profilePicture = $request->file('profile_picture');
            $imagePath = $profilePicture->store('profile_pictures', 'public');
            $userData['profile_picture'] = $imagePath;
        }

        if ($request->hasFile('resume')) {
            $resume = $request->file('resume');
            $resumePath = $resume->store('resumes', 'public');
            $userData['resume'] = $resumePath;
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
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048'
        ]);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'preferences' => $request->preferences,
            'gender' => $request->gender,
        ];

        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
            $profilePicture = $request->file('profile_picture');
            $imagePath = $profilePicture->store('profile_pictures', 'public');
            $userData['profile_picture'] = $imagePath;
        }

        if ($request->hasFile('resume')) {
            // Delete old resume if exists
            if ($user->resume) {
                Storage::disk('public')->delete($user->resume);
            }
            $resume = $request->file('resume');
            $resumePath = $resume->store('resumes', 'public');
            $userData['resume'] = $resumePath;
        }

        $user->update($userData);

        return response()->json($user->fresh(), 200);
    }

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        // Delete associated files
        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }
        if ($user->resume) {
            Storage::disk('public')->delete($user->resume);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
