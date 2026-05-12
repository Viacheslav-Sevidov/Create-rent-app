<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tenant;
use App\Models\Contract;
use Carbon\Carbon;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string',
            'edrpou'       => 'required|string',
            'contact_person' => 'required|string',
            'phone'        => 'required|string',
            'email'        => 'required|email',
            'unit_id'      => 'required|integer',
            'days'         => 'required|integer',
            'total_price'  => 'required|numeric',
        ]);

        $tenant = Tenant::firstOrCreate(
            ['edrpou' => $validated['edrpou']],
            [
                'company_name'   => $validated['company_name'],
                'contact_person' => $validated['contact_person'],
                'phone'          => $validated['phone'],
                'email'          => $validated['email'],
            ]
        );

        $contract = Contract::create([
            'contract_no' => 'CT-' . strtoupper(uniqid()),
            'tenant_id'   => $tenant->id,
            'unit_id'     => $validated['unit_id'],
            'start_date'  => Carbon::now(),
            'end_date'    => Carbon::now()->addDays($validated['days']),
            'fixed_rent'  => $validated['total_price'],
            'is_active'   => 1
        ]);

        return response()->json([
            'message' => 'Договір успішно оформлено!',
            'contract_no' => $contract->contract_no
        ], 201);
    }
}
