<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'company_name', 
        'brand_name', 
        'edrpou', 
        'contact_person', 
        'phone', 
        'email'
    ];

    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
}