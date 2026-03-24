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
            'id' => 1,
            'name' => 'SmartCharge V1 (Edition Titane)',
            'description' => 'L\'unité phare avec recharge 15W et dissipateur thermique ionique.',
            'price' => 159.00,
            'category' => 'UNITÉ PRINCIPALE',
            'stock' => 500,
            'sku' => 'SL-V1-TITAN',
            'spec' => 'TITANE G5 USINÉ',
            'image_url' => '/product-v1.png'
        ]);

        \App\Models\Product::create([
            'id' => 2,
            'name' => 'Câble Solaris Precision (2m)',
            'description' => 'Conductivité maximale pour une charge sans perte thermique.',
            'price' => 39.00,
            'category' => 'ACCESSOIRE',
            'stock' => 1200,
            'sku' => 'SL-ACC-CABLE',
            'spec' => 'TRESSAGE ARAMIDE',
            'image_url' => '/product-cable.png'
        ]);

        \App\Models\Product::create([
            'id' => 3,
            'name' => 'Support Stasis v2',
            'description' => 'Angle de vue optimisé à 45° pour un usage bureau.',
            'price' => 89.00,
            'category' => 'ACCESSOIRE',
            'stock' => 800,
            'sku' => 'SL-ACC-STAND',
            'spec' => 'ALUMINIUM AÉRONAUTIQUE',
            'image_url' => '/product-stasis.png'
        ]);

        \App\Models\Product::create([
            'id' => 4,
            'name' => 'Adaptateur Mural 45W Plus',
            'description' => 'Énergie ultra-compacte avec protection contre les surtensions.',
            'price' => 59.00,
            'category' => 'ACCESSOIRE',
            'stock' => 1500,
            'sku' => 'SL-ACC-WALL',
            'spec' => 'GAN TECHNOLOGY',
            'image_url' => '/product-gan.png'
        ]);
    }
}
