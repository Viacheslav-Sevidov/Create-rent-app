<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UnitController;

Route::get('/units', [UnitController::class, 'index']);
Route::get('/units/{id}', [UnitController::class, 'show']);
Route::post('/units/store', [UnitController::class, 'store']);
Route::put('/units/{id}', [UnitController::class, 'update']);
Route::delete('/units/{id}', [UnitController::class, 'destroy']);

Route::get('/categories', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Офісні приміщення', 'type' => 'office'],
        ['id' => 2, 'name' => 'Торгові площі', 'type' => 'retail'],
        ['id' => 3, 'name' => 'Склади', 'type' => 'warehouse'],
    ], 200);
});