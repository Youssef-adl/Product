<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    protected $telegram;

    public function __construct(TelegramService $telegram)
    {
        $this->telegram = $telegram;
    }

    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['items.product'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric',
            'shipping_address' => 'required|string',
            'phone' => 'nullable|string',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
        ]);

        return DB::transaction(function () use ($validated) {
            $orderNumber = 'SOL-' . date('Ymd') . '-' . mt_rand(1000, 9999);

            $order = Order::create([
                'user_id' => $validated['user_id'],
                'order_number' => $orderNumber,
                'total_amount' => $validated['total_amount'],
                'shipping_address' => $validated['shipping_address'],
                'phone' => $validated['phone'] ?? null,
                'status' => 'pending',
            ]);

            $itemsList = "";
            foreach ($validated['items'] as $itemData) {
                $item = $order->items()->create($itemData);
                $product = Product::find($itemData['product_id']);
                $itemsList .= "• {$product->name} (x{$itemData['quantity']})\n";
            }

            // Format and Send Telegram Notification
            $message = "☀️ <b>NOUVELLE COMMANDE SOLARIS !</b>\n\n";
            $text = "🆔 <b>CODE:</b> <code>{$orderNumber}</code>\n";
            $text .= "👤 <b>CLIENT ID:</b> {$order->user_id}\n";
            $text .= "📞 <b>TEL:</b> " . ($order->phone ?? 'N/A') . "\n";
            $text .= "📍 <b>LIVRAISON:</b> {$order->shipping_address}\n\n";
            $text .= "📦 <b>ARTICLES:</b>\n{$itemsList}\n";
            $text .= "💰 <b>TOTAL:</b> \${$order->total_amount}\n";
            $text .= "🕒 <b>DATE:</b> " . now()->format('d/m/Y H:i');

            try {
                $this->telegram->sendMessage($message . $text);
            } catch (\Exception $e) {
                // Log error but don't fail the order if Telegram is down
                \Log::error("Telegram Notification Failed: " . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order' => $order->load('items.product')
            ], 201);
        });
    }
}
