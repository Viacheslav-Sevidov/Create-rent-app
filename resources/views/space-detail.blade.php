@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
        
        <div class="flex justify-between items-center border-b pb-4 mb-4">
            <h1 class="text-3xl font-bold text-gray-800">Лот {{ $space->unit_number }}</h1>
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {{ ['available' => 'Вільне', 'occupied' => 'Зайняте', 'repair' => 'Ремонт'][$space->status] ?? 'Невідомо' }}
            </span>
        </div>

        <div class="grid grid-cols-2 gap-4 text-gray-600 text-lg">
            <p><strong>Поверх:</strong> {{ $space->floor }}</p>
            <p><strong>Площа:</strong> {{ $space->area }} м&sup2;</p>
            <p><strong>Базова ціна:</strong> {{ $space->base_price }} ₴/м&sup2;</p>
            <p><strong>Кондиціонер:</strong> {{ $space->has_conditioner ? 'Є' : 'Немає' }}</p>
        </div>

        <div class="mt-8 text-center border-t pt-6">
            <button class="bg-red-800 text-white font-bold py-3 px-8 rounded hover:bg-red-700">
                Залишити заявку на оренду
            </button>
            <br>
            <a href="/spaces" class="text-gray-600 hover:underline mt-4 inline-block">&larr; Повернутися до каталогу</a>
        </div>

    </div>
</div>
@endsection