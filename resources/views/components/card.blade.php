@props(['title', 'area', 'status'])

<div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 class="text-xl font-bold text-gray-800">{{ $title }}</h3>
    <p class="text-gray-600 mt-2">Площа: <span class="font-semibold">{{ $area }} м²</span></p>
    <p class="text-gray-600 mt-2">Статус: <span class="font-semibold">{{ $status }}</span></p>
</div>