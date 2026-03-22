<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index()
    {
        return response()->json(Unit::all(), 200);
    }

    public function show($id)
    {
        $unit = Unit::find($id);

        if (!$unit) {
            return response()->json(['message' => 'Приміщення не знайдено'], 404);
        }

        return response()->json($unit, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_number' => 'required|string',
            'floor' => 'required|integer',
            'area' => 'required|numeric',
            'base_price' => 'required|numeric',
            'status' => 'required|string',
            'has_conditioner' => 'boolean'
        ]);

        $unit = Unit::create($validated);

        return response()->json([
            'message' => 'Приміщення успішно створено!',
            'data' => $unit
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $unit = Unit::find($id);

        if (!$unit) {
            return response()->json(['message' => 'Приміщення не знайдено'], 404);
        }

        $unit->update($request->all());

        return response()->json([
            'message' => 'Дані оновлено успішно',
            'data' => $unit
        ], 200);
    }

    public function destroy($id)
    {
        $unit = Unit::find($id);

        if (!$unit) {
            return response()->json(['message' => 'Приміщення не знайдено'], 404);
        }

        $unit->delete();

        return response()->json(['message' => 'Приміщення видалено'], 200);
    }
}