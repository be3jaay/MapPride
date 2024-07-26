<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\TabsController;
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\FeedbackController;

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

Route::post('/resources', [ResourcesController::class, 'store']);
Route::get('/resources', [ResourcesController::class, 'index']);

Route::post('/training', [TrainingController::class, 'store']);
Route::get('/training', [TrainingController::class, 'index']);

Route::post('/feedback', [FeedbackController::class, 'store']);
Route::get('/feedback', [FeedbackController::class, 'index']);