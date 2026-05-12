<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'contract_no',
        'tenant_id',
        'unit_id',
        'start_date',
        'end_date',
        'fixed_rent',
        'turnover_percent',
        'is_active'
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
