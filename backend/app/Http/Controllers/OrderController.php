<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    protected $telegram;

    public function __construct(TelegramService $telegram)
    {
        $this->telegram = $telegram;
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string',
            'total' => 'required|numeric',
            'address' => 'required|string',
        ]);

        $orderNumber = 'LS-' . date('Y') . '-' . mt_rand(10000, 99999);

        $order = Order::create([
            'order_number' => $orderNumber,
            'customer_name' => $validated['customer_name'],
            'total' => $validated['total'],
            'address' => $validated['address'],
            'status' => 'pending',
        ]);

        // Format and Send Telegram Notification
        $message = "🚀 <b>Nouvelle Commande B2B !</b>\n\n";
        $text = "🆔 <b>ID:</b> {$orderNumber}\n";
        $text .= "👤 <b>Client:</b> {$order->customer_name}\n";
        $text .= "💰 <b>Total:</b> \${$order->total}\n";
        $text .= "📍 <b>Adresse:</b> {$order->address}\n\n";
        $text .= "🕒 <b>Date:</b> " . now()->format('d/m/Y H:i');

        $this->telegram->sendMessage($message . $text);

        return response()->json([
            'success' => true,
            'message' => 'Order placed successfully',
            'order_id' => $order->id
        ], 201);
    }
}
