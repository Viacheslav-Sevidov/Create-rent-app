<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UnitController;

Route::get('/units', [UnitController::class, 'index']);
Route::get('/units/{id}', [UnitController::class, 'show']);
Route::post('/units/store', [UnitController::class, 'store']);
Route::put('/units/{id}', [UnitController::class, 'update']);
Route::delete('/units/{id}', [UnitController::class, 'destroy']);