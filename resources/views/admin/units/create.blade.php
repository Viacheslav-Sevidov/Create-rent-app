@extends('layouts.app')

@section('title', 'Додати приміщення')

@section('content')
<div class="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto mt-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Додавання нового лота</h2>

    <form action="{{ route('units.store') }}" method="POST" class="space-y-4">
        @csrf <div>
            <label class="block text-gray-700 mb-1">Номер лота (наприклад, D-401)</label>
            <input type="text" name="unit_number" value="{{ old('unit_number') }}" 
                   class="w-full border rounded p-2 focus:ring focus:ring-blue-200">
            @error('unit_number')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-gray-700 mb-1">Поверх</label>
                <input type="number" name="floor" value="{{ old('floor') }}" class="w-full border rounded p-2">
                @error('floor') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <label class="block text-gray-700 mb-1">Площа (кв.м)</label>
                <input type="number" name="area" step="0.01" value="{{ old('area') }}" class="w-full border rounded p-2">
                @error('area') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
            </div>
        </div>

        <div>
            <label class="block text-gray-700 mb-1">Базова ціна (грн за кв.м)</label>
            <input type="number" name="base_price" step="0.01" value="{{ old('base_price') }}" class="w-full border rounded p-2">
            @error('base_price') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="flex items-center mt-4">
            <input type="checkbox" name="has_conditioner" id="has_conditioner" value="1" {{ old('has_conditioner') ? 'checked' : '' }} class="mr-2 h-4 w-4">
            <label for="has_conditioner" class="text-gray-700">Наявність кондиціонера</label>
        </div>

        <div>
            <label class="block text-gray-700 mb-1">Статус приміщення</label>
            <select name="status" class="w-full border rounded p-2">
                <option value="available" {{ old('status') == 'available' ? 'selected' : '' }}>Вільне</option>
                <option value="occupied" {{ old('status') == 'occupied' ? 'selected' : '' }}>Орендовано</option>
                <option value="repair" {{ old('status') == 'repair' ? 'selected' : '' }}>На ремонті</option>
            </select>
            @error('status') <p class="text-red-500 text-sm mt-1">{{ $message }}</p> @enderror
        </div>

        <div class="flex justify-between items-center mt-6 pt-4 border-t">
            <a href="{{ route('units.index') }}" class="text-gray-500 hover:underline">Скасувати</a>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Зберегти</button>
        </div>
    </form>
</div>
@endsection