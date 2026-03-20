@extends('layouts.app')

@section('title', $spaces['name'] . ' - Деталі')

@section('content')
    <div class="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto mt-6">
        <a href="/spaces" class="text-gray-600 hover:underline mb-6 inline-block">&larr; Назад до каталогу</a>
        
        <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ $spaces['name'] }}</h2>
        
        <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p class="text-lg text-gray-700">
                Ви переглядаєте характеристики торгової площі з ID: {{ $spaces['id'] }}
            </p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-gray-50 border border-gray-200 rounded">
                <p class="text-sm text-gray-500">Площа</p>
                <p class="text-xl font-bold text-gray-800">{{ $spaces['area'] }}</p>
            </div>
            <div class="p-4 bg-gray-50 border border-gray-200 rounded">
                <p class="text-sm text-gray-500">Статус</p>
                <p class="text-xl font-bold text-gray-800">{{ $spaces['status'] }}</p>
            </div>
        </div>
    </div>
@endsection