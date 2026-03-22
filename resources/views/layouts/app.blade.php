<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>@yield('title', 'Оренда торгових площ')</title>
</head>
<body class="bg-gray-200 flex flex-col min-h-screen">

    <header class="bg-red-800 text-white shadow-md">
        <nav class="container mx-auto p-4 flex justify-between items-center">
            <div class="text-xl font-bold">Оренда Площ</div>
            <div class="space-x-4">
                <a href="/" class="hover:text-red-300">Головна</a>
                <a href="/about" class="hover:text-red-300">Про проєкт</a>
                <a href="/spaces" class="hover:text-red-300">Каталог площ</a>
            </div>
            <div class="flex items-center space-x-4">
    
                @guest
                    <a href="{{ route('login') }}" class="text-white hover:underline">Вхід</a>
                    <a href="{{ route('register') }}" class="bg-white text-red-800 px-3 py-1 rounded hover:bg-gray-200 transition">Реєстрація</a>
                @endguest

                @auth
                    <a href="{{ route('units.index') }}" class="text-white hover:underline mr-4">Адмін-панель</a>
        
                    <span class="text-white font-bold border-l border-red-400 pl-4 ml-2">
                    Привіт, {{ Auth::user()->name }}!
                    </span>

                    <form method="POST" action="{{ route('logout') }}" class="inline ml-4">
                        @csrf
                        <button type="submit" class="border border-white text-white px-3 py-1 rounded hover:bg-white hover:text-red-800 transition">
                        Вихід
                        </button>
                    </form>
                @endauth

            </div>
        </nav>
    </header>

    <main class="container mx-auto p-4 flex-grow mt-6">
        @yield('content')
    </main>

    <footer class="text-black text-center p-4 mt-auto">
        <p>&copy; 2026 рік</p>
    </footer>

</body>
</html>