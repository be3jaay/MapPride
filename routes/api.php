<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\TabsController;
use App\Http\Controllers\TrainingTabsController;
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\HotlineController;
use App\Http\Controllers\MapSelectionController;
use App\Http\Controllers\MarkerLocationController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\Auth\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Experience routes
Route::apiResource('experience', ExperienceController::class);
Route::put('/experience/{id}/approve', [ExperienceController::class, 'approve']);
Route::put('/experience/{id}/decline', [ExperienceController::class, 'decline']);
Route::get('/experience/approved', [ExperienceController::class, 'getApproved']);

// Tabs routes
Route::apiResource('tabs', TabsController::class);

// Training Tabs routes
Route::apiResource('training-tabs', TrainingTabsController::class);

// Resources routes
Route::apiResource('resources', ResourcesController::class);

// Support routes
Route::apiResource('support', SupportController::class);

// Hotlines routes
Route::apiResource('hotlines', HotlineController::class);

// Training routes
Route::apiResource('training', TrainingController::class);

// Feedback routes
Route::apiResource('feedback', FeedbackController::class)->except(['update']);

// Map Selection routes
Route::apiResource('map-selection', MapSelectionController::class)->only(['index', 'store']);

// Marker Location routes
Route::apiResource('marker-location', MarkerLocationController::class)->only(['index', 'store']);

// Map routes
Route::apiResource('map', MapController::class);

Route::apiResource('blogs', BlogsController::class);

// Location Like routes

Route::apiResource('users', RegisteredUserController::class);

Route::post('/blogs/{blog}/comments', [BlogsController::class, 'storeComment']);

// Add this line in routes/api.php
Route::get('/blogs/{blog}/comments', [BlogsController::class, 'showComments']);

Route::post('/map/{id}/rate', [MapController::class, 'rate']);

Route::get('/map/{id}/rate', [MapController::class, 'averageRating']);


Route::get('/maps/highest-rated', [MapController::class, 'getHighestRatedMap']);

