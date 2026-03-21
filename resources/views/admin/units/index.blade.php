@extends('layouts.app')

@section('title', 'Адмінка - Всі приміщення')

@section('content')
<div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Управління приміщеннями</h2>

    <a href="{{ route('units.create') }}" class="bg-green-600 text-white px-4 py-2 rounded inline-block mb-4">Додати приміщення</a>

    @if(session('success'))
        <div class="bg-green-100 text-green-800 p-3 rounded mb-4">
            {{ session('success') }}
        </div>
    @endif

    <table class="w-full border-collapse border border-gray-200">
        <thead class="bg-gray-100">
            <tr>
                <th class="border p-2">Лот</th>
                <th class="border p-2">Поверх</th>
                <th class="border p-2">Площа</th>
                <th class="border p-2">Дії</th>
            </tr>
        </thead>
        <tbody>
            @foreach($units as $unit)
            <tr class="text-center">
                <td class="border p-2 font-bold">{{ $unit->unit_number }}</td>
                <td class="border p-2">{{ $unit->floor }}</td>
                <td class="border p-2">{{ $unit->area }} кв.м</td>
                <td class="border p-2 flex justify-center space-x-2">
                    <a href="{{ route('units.show', $unit->id) }}" class="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-800 transition">Деталі</a>
    
                    <form action="{{ route('units.destroy', $unit->id) }}" method="POST" onsubmit="return confirm('Точно видалити?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition">Видалити</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection