<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    echo "Testing Products...\n";
    $totalProducts = App\Models\Product::count();
    
    echo "Testing Sales...\n";
    $totalSales = App\Models\Order::whereNotIn('status', ['cancelled', 'refunded'])->sum('total_amount');
    
    echo "Testing Users...\n";
    $activeUsers = App\Models\User::where('role', '!=', 'admin')->orWhereNull('role')->count();
    
    echo "Testing Orders...\n";
    $recentOrders = App\Models\Order::with('user')->latest()->take(5)->get()->map(function($order) {
        return [
            'id' => $order->order_number,
            'client' => $order->user ? $order->user->name : 'Anonymous',
            'total' => $order->total_amount,
            'status' => ucfirst($order->status),
        ];
    });

    echo "SUCCESS!\n";
} catch (\Throwable $e) {
    echo "ERROR: " . $e->getMessage() . " in " . $e->getFile() . ':' . $e->getLine() . "\n";
}
