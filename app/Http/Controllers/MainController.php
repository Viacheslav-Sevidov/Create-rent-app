<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index()
    {
        return "Вітаємо у системі управління орендою торгових площ!";
    }

    public function about()
    {
        return "Про проєкт: Ця веб-система створена для автоматизації обліку комерційної нерухомості та взаємодії з орендарями.";
    }
}