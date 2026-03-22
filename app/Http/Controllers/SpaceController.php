<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unit;

class SpaceController extends Controller
{
    public function index()
    {
        $spaces = Unit::all();

        return view('spaces', compact('spaces'));
    }

    public function show($unit_number)
    {

        $space = \App\Models\Unit::where('unit_number', $unit_number)->firstOrFail();
        
        if (!$space){
            abort(404);
        };

        return view('space-detail', ['space' => $space]);
    }
}