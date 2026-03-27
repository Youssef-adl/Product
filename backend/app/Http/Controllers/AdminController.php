<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboardStats()
    {
        $totalProducts = Product::count();
        $totalSales = Order::whereNotIn('status', ['cancelled', 'refunded'])->sum('total_amount');
        $activeUsers = User::where('role', '!=', 'admin')->orWhereNull('role')->count();
        $recentOrders = Order::with('user')->latest()->take(5)->get()->map(function($order) {
            return [
                'id' => $order->order_number,
                'client' => $order->user ? $order->user->name : 'Anonymous',
                'total' => $order->total_amount,
                'status' => ucfirst($order->status),
            ];
        });

        return response()->json([
            'success' => true,
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalSales' => (float) $totalSales,
                'activeUsers' => $activeUsers,
                'recentOrders' => $recentOrders,
                'conversionRate' => '3.2%', // Mocked for now as we don't track visits
            ]
        ]);
    }
}
