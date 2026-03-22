@extends('layouts.app')

@section('title', 'Каталог площ')

@section('content')
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Доступні приміщення</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @foreach($spaces as $space)
        
            <x-card 
                :title="$space->unit_number" 
                :floor="$space->floor" 
                :area="$space->area" 
                :price="$space->base_price"
                :status="$space->status" 
            />
        
        @endforeach
    </div>
@endsection