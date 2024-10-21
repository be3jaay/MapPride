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
use Illuminate\Support\Facades\Http;
use App\Models\Map; // Import the Map model

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

Route::apiResource('experience', ExperienceController::class);
Route::put('/experience/{id}/approve', [ExperienceController::class, 'approve']);
Route::put('/experience/{id}/decline', [ExperienceController::class, 'decline']);
Route::get('/experience/approved', [ExperienceController::class, 'getApproved']);
Route::get('/experience/view-all', [ExperienceController::class, 'show']);

Route::apiResource('tabs', TabsController::class);

Route::apiResource('training-tabs', TrainingTabsController::class);

Route::apiResource('resources', ResourcesController::class);
Route::get('/resources/view-all', [ResourcesController::class, 'show']);


Route::apiResource('support', SupportController::class);

Route::apiResource('hotlines', HotlineController::class);

Route::apiResource('training', TrainingController::class);

Route::get('/training/view-all', [TrainingController::class, 'show']);


Route::apiResource('feedback', FeedbackController::class)->except(['update']);

Route::apiResource('map-selection', MapSelectionController::class)->only(['index', 'store']);

Route::apiResource('marker-location', MarkerLocationController::class)->only(['index', 'store']);

Route::apiResource('map', MapController::class);

Route::get('/map/view-all', [MapController::class, 'show']);

Route::post('/map/{id}/rate', [MapController::class, 'rate']);

Route::get('/map/{id}/rate', [MapController::class, 'averageRating']);

Route::get('/maps/highest-rated', [MapController::class, 'getHighestRatedMap']);

Route::apiResource('blogs', BlogsController::class);

Route::post('/blogs/{blog}/comments', [BlogsController::class, 'storeComment']);

Route::get('/blogs/{blog}/comments', [BlogsController::class, 'showComments']);

Route::apiResource('users', RegisteredUserController::class);
Route::get('/users/view-all', [RegisteredUserController::class, 'show']);

Route::get('/proxy/places', function (Request $request) {
    $apiKey = env('GOOGLE_MAPS_API_KEY'); // Ensure this is set in your .env file
    $location = $request->input('location');
    $radius = $request->input('radius');
    $keyword = $request->input('keyword');

    $response = Http::get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", [
        'location' => $location,
        'radius' => $radius,
        'keyword' => $keyword,
        'key' => $apiKey,
    ]);

    return $response->json(); // Return the JSON response from the Google API
});
