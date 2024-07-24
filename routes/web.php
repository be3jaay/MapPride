<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminDashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('UserDashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/map', function () {
    return Inertia::render('UserDashboard/Map');
})->middleware(['auth'])->name('map');

Route::get('/resources', function () {
    return Inertia::render('UserDashboard/Resources');
})->middleware(['auth'])->name('resources');

Route::get('/training', function () {
    return Inertia::render('UserDashboard/Training');
})->middleware(['auth'])->name('training');

Route::get('/feedback', function () {
    return Inertia::render('UserDashboard/Feedback');
})->middleware(['auth'])->name('feedback');

Route::get('/support', function () {
    return Inertia::render('UserDashboard/Support');
})->middleware(['auth'])->name('support');

Route::get('/experience', function () {
    return Inertia::render('UserDashboard/Experience');
})->middleware(['auth'])->name('experience');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('AdminDashboard/AdminDashboard');
    })->name('admin.dashboard');

    Route::get('/admin/resources', function () {
        return Inertia::render('AdminDashboard/AdminResources');
    })->name('admin.resources');

    Route::get('/admin/training', function () {
        return Inertia::render('AdminDashboard/AdminTraining');
    })->name('admin.training');

    Route::get('/admin/experience', function () {
        return Inertia::render('AdminDashboard/AdminExperience');
    })->name('admin.experience');

    Route::get('/admin/feedback', function () {
        return Inertia::render('AdminDashboard/AdminFeedback');
    })->name('admin.feedback');

    // Add more admin routes as needed
});

require __DIR__.'/auth.php';


