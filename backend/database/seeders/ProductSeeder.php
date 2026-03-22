<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::create([
            'name' => 'Lodestone Wireless Fast Charging Station',
            'description' => 'Industrial-grade wireless charging hub for high-traffic environments.',
            'price' => 89.99,
            'category' => 'Hardware',
            'stock' => 500,
            'sku' => 'LS-WCS-001',
            'image_url' => 'https://via.placeholder.com/300'
        ]);

        \App\Models\Product::create([
            'name' => 'Lodestone Smart Connector Pro',
            'description' => 'Ultra-fast data and power connector for B2B infrastructure.',
            'price' => 45.50,
            'category' => 'Accessories',
            'stock' => 1200,
            'sku' => 'LS-SCP-002',
            'image_url' => 'https://via.placeholder.com/300'
        ]);
    }
}
