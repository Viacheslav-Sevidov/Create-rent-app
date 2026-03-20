<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpaceController extends Controller
{

    private $spaces = [
        ['id' => 1, 'name' => 'Павільйон А1', 'area' => '50 кв.м', 'status' => 'Вільний'],
        ['id' => 2, 'name' => 'Острівець Б3', 'area' => '10 кв.м', 'status' => 'Орендовано'],
        ['id' => 3, 'name' => 'Магазин С2', 'area' => '120 кв.м', 'status' => 'Вільний']
    ];

    public function index()
    {

        return view('spaces', ['spaces' => $this->spaces]);
    }

    public function show($id)
    {

        $spaces = collect($this->spaces)->firstWhere('id', (int)$id);
        
        if (!$spaces){
            abort(404);
        };

        return view('space-detail', ['spaces' => $spaces]);
    }
}