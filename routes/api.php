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

Route::post('/experience', [ExperienceController::class, 'store']);
Route::get('/experience', [ExperienceController::class, 'index']);

Route::post('/tabs', [TabsController::class, 'store']);
Route::get('/tabs', [TabsController::class, 'index']);

Route::post('/trainingTabs', [TrainingTabsController::class, 'store']);
Route::get('/trainingTabs', [TrainingTabsController::class, 'index']);

Route::post('/resources', [ResourcesController::class, 'store']);
Route::get('/resources', [ResourcesController::class, 'index']);
Route::put('/resources/{id}', [ResourcesController::class, 'update']);
Route::delete('/resources/{id}', [ResourcesController::class, 'destroy']);

Route::post('/support', [SupportController::class, 'store']);
Route::get('/support', [SupportController::class, 'index']);
Route::put('/support/{id}', [SupportController::class, 'update']);
Route::delete('/support/{id}', [SupportController::class, 'destroy']);


Route::post('/hotlines', [HotlineController::class, 'store']);
Route::get('/hotlines', [HotlineController::class, 'index']);
Route::put('/hotlines/{id}', [HotlineController::class, 'update']);
Route::delete('/hotlines/{id}', [HotlineController::class, 'destroy']);

Route::post('/training', [TrainingController::class, 'store']);
Route::get('/training', [TrainingController::class, 'index']);
Route::put('/training/{id}', [TrainingController::class, 'update']);
Route::delete('/training/{id}', [TrainingController::class, 'destroy']);

Route::post('/feedback', [FeedbackController::class, 'store']);
Route::get('/feedback', [FeedbackController::class, 'index']);

Route::post('/map-selection', [MapSelectionController::class, 'store']);
Route::get('/map-selection', [MapSelectionController::class, 'index']);

Route::post('/marker-location', [MarkerLocationController::class, 'store']);
Route::get('/marker-location', [MarkerLocationController::class, 'index']);

Route::post('/map', [MapController::class, 'store']);
Route::get('/map', [MapController::class, 'index']);