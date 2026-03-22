<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Unit;

class SpaceController extends Controller
{

    //private $spaces = [
    //    ['id' => 1, 'name' => 'Павільйон А1', 'area' => '52 кв.м', 'status' => 'Вільний'],
    //    ['id' => 2, 'name' => 'Острівець Б3', 'area' => '10 кв.м', 'status' => 'Орендовано'],
    //    ['id' => 3, 'name' => 'Магазин С2', 'area' => '120 кв.м', 'status' => 'Вільний']
    //];

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