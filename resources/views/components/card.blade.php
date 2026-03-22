@props(['title', 'area', 'price' ,'status'])

<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 class="text-xl font-bold text-gray-800">{{ $title }}</h3>
    <p class="text-gray-600 mt-2">Площа: <span class="font-semibold">{{ $area }} м²</span></p>
    <p class="text-gray-600 mt-2">
        Ціна: <span class="font-semibold">{{ $price }} грн/м&sup2;</span>
    </p>
    <p class="text-gray-600 mt-2">
        Статус: 
        <span class="font-semibold">
            {{ ['available' => 'Вільне', 'occupied' => 'Зайняте', 'repair' => 'Ремонт'][$status] ?? 'Невідомо' }}
            </span>
    </p>
    <div class="mt-4">
        <a href="{{ route('spaces.show', $title) }}" class="inline-block bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 transition">
            Детальніше про {{ $title }}
        </a>
    </div>
</div>

