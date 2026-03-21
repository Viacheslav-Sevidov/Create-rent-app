<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::all();
        return view('admin.units.index', compact('units'));
    }

    public function create()
    {
        return view('admin.units.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_number' => [
            'required', 
            'string', 
            'max:10', 
            'unique:units,unit_number', 
            'regex:/^[A-Z]-[0-9]{3}$/'
            ],
            'floor' => 'required|integer',
            'area' => 'required|numeric|min:1',
            'base_price' => 'required|numeric|min:1',
            'status' => 'required|in:available,occupied,repair',
        ], [
            'unit_number.required' => 'Введіть номер лота!',
            'unit_number.unique' => 'Такий номер лота вже існує!',
            'area.min' => 'Площа має бути більшою за нуль!',
            'base_price.min' => 'Ціна має бути більшою за нуль!',
        ]);

        $validated['has_conditioner'] = $request->has('has_conditioner') ? 1 : 0;

        Unit::create($validated);

        return redirect()->route('units.index')->with('success', 'Нове приміщення успішно додано!');
    }

    public function show(Unit $unit)
    {
        return view('admin.units.show', compact('unit'));
    }

    public function destroy(Unit $unit)
    {
        $unit->delete();
        return redirect()->route('units.index')->with('success', 'Приміщення успішно видалено!');
    }

}