@extends('layouts.app')

@section('title', 'Деталі: ' . $unit->unit_number)

@section('content')
<div class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-6">
    <a href="{{ route('units.index') }}" class="text-gray-600 hover:underline mb-4 inline-block">&larr; Назад до списку</a>
    
    <h2 class="text-3xl font-bold mb-4">Лот {{ $unit->unit_number }}</h2>
    
    <ul class="text-lg space-y-2">
        <li><strong>ID у базі:</strong> {{ $unit->id }}</li>
        <li><strong>Поверх:</strong> {{ $unit->floor }}</li>
        <li><strong>Площа:</strong> {{ $unit->area }} кв.м</li>
        <li><strong>Базова ціна:</strong> {{ $unit->base_price }} грн/кв.м</li>
        <li><strong>Кондиціонер:</strong> {{ $unit->has_conditioner ? 'Є' : 'Немає' }}</li>
        <li><strong>Статус:</strong> 
            <span class="px-2 py-1 rounded text-white text-sm 
                {{ $unit->status == 'available' ? 'bg-green-500' : ($unit->status == 'occupied' ? 'bg-red-500' : 'bg-yellow-500') }}">
                {{ $unit->status }}
            </span>
        </li>
    </ul>
</div>
@endsection