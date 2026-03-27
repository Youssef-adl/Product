<?php

namespace App\Http\Controllers;

use App\Models\ReturnRequest;
use App\Models\Order;
use Illuminate\Http\Request;

class ReturnRequestController extends Controller
{
    /**
     * Client: submit a return request for their order.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'reason'   => 'required|in:not_liked,defective,wrong_item,other',
        ]);

        // Ensure the order belongs to the authenticated user
        $order = Order::where('id', $validated['order_id'])
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        // Check if a return request already exists for this order
        $existing = ReturnRequest::where('order_id', $order->id)->first();
        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'Une demande de retour existe déjà pour cette commande.',
            ], 422);
        }

        $returnRequest = ReturnRequest::create([
            'order_id' => $order->id,
            'user_id'  => $request->user()->id,
            'reason'   => $validated['reason'],
            'status'   => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Demande de retour enregistrée avec succès.',
            'return_request' => $returnRequest->load('order'),
        ], 201);
    }

    /**
     * Admin: list all return requests.
     */
    public function index()
    {
        $returns = ReturnRequest::with(['order.items.product', 'user'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'returns' => $returns,
        ]);
    }

    /**
     * Admin: update a return request status (approved/rejected).
     */
    public function update(Request $request, ReturnRequest $returnRequest)
    {
        $validated = $request->validate([
            'status'     => 'required|in:approved,rejected',
            'admin_note' => 'nullable|string|max:500',
        ]);

        $returnRequest->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Statut de retour mis à jour.',
            'return_request' => $returnRequest->load(['order', 'user']),
        ]);
    }
}
