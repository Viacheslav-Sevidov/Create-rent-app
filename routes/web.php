<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\SpaceController;

Route::get('/', [MainController::class, 'index']);

Route::get('/about', [MainController::class, 'about']);

Route::get('/spaces', [SpaceController::class, 'index']);

Route::get('/spaces/{id}', [SpaceController::class, 'show']);