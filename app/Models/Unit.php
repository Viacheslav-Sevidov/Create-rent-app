<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    public $timestamps = false; 

    protected $fillable = [
        'unit_number', 'floor', 'area', 'has_conditioner', 'base_price', 'status'
    ];
}