<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpaceController extends Controller
{
    public function index()
    {
        $spaces = [
            ['id' => 1, 'name' => 'Павільйон А1', 'area' => '50 кв.м', 'status' => 'Вільний'],
            ['id' => 2, 'name' => 'Острівець Б3', 'area' => '10 кв.м', 'status' => 'Орендовано'],
            ['id' => 3, 'name' => 'Магазин С2', 'area' => '120 кв.м', 'status' => 'Вільний']
        ];

        return $spaces;
    }

    public function show($id)
    {
        return "Детальна інформація та характеристики торгової площі з ID: " . $id;
    }
}