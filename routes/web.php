<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/map', function () {
    return Inertia::render('Map');
})->middleware(['auth'])->name('map');

Route::get('/resources', function () {
    return Inertia::render('Resources');
})->middleware(['auth'])->name('resources');

Route::get('/training', function () {
    return Inertia::render('Training');
})->middleware(['auth'])->name('training');

Route::get('/feedback', function () {
    return Inertia::render('Feedback');
})->middleware(['auth'])->name('feedback');

Route::get('/support', function () {
    return Inertia::render('Support');
})->middleware(['auth'])->name('support');

Route::get('/experience', function () {
    return Inertia::render('Experience');
})->middleware(['auth'])->name('experience');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

route::get('admin/dashboard',[HomeController::class,'index']);