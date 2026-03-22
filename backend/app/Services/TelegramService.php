<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    protected $token;
    protected $chatId;

    public function __construct()
    {
        $this->token = env('TELEGRAM_BOT_TOKEN');
        $this->chatId = env('TELEGRAM_CHAT_ID');
    }

    /**
     * Send a message to the configured Telegram chat.
     */
    public function sendMessage($message)
    {
        if (!$this->token || !$this->chatId) {
            Log::warning('Telegram credentials not set. Message not sent: ' . $message);
            return false;
        }

        try {
            $response = Http::post("https://api.telegram.org/bot{$this->token}/sendMessage", [
                'chat_id' => $this->chatId,
                'text' => $message,
                'parse_mode' => 'HTML'
            ]);

            return $response->successful();
        } catch (\Exception $e) {
            Log::error('Telegram notification error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Format B2B order data for Telegram notification.
     */
    public function formatOrderMessage($order, $items, $user)
    {
        $text = "🚀 <b>Nouvelle Commande B2B !</b>\n\n";
        $text .= "🆔 <b>Commande:</b> #{$order->id}\n";
        $text .= "👤 <b>Client:</b> {$user->name}\n";
        $text .= "📞 <b>Contact:</b> {$user->email}\n\n";
        
        $text .= "📦 <b>Articles:</b>\n";
        foreach ($items as $item) {
            $text .= "- {$item['name']} (x{$item['quantity']})\n";
        }
        
        $text .= "\n💰 <b>Total:</b> $" . number_format($order->total_amount, 2) . "\n";
        $text .= "🕒 <b>Date:</b> " . now()->format('d/m/Y H:i');
        
        return $text;
    }
}
