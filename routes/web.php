<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\Admin\UnitController;

Route::get('/', [MainController::class, 'index']);

Route::get('/about', [MainController::class, 'about']);

Route::get('/spaces', [SpaceController::class, 'index']);

Route::get('/spaces/{id}', [SpaceController::class, 'show']);

Route::get('/admin/units', [UnitController::class, 'index'])->name('units.index');

Route::get('/admin/units/create', [UnitController::class, 'create'])->name('units.create');

Route::post('/admin/units', [UnitController::class, 'store'])->name('units.store');

Route::get('/admin/units/{unit}', [UnitController::class, 'show'])->name('units.show');

Route::delete('/admin/units/{unit}', [UnitController::class, 'destroy'])->name('units.destroy');