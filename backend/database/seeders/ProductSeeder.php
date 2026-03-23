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
            'name' => 'SOLARIS PRO 2026',
            'description' => 'Le summum de la charge inductive. Usiné dans un bloc d\'aluminium aéronautique 7075-T6 avec gestion thermique Ionic-Cooling.',
            'price' => 159.00,
            'category' => 'UNITÉ PRINCIPALE',
            'stock' => 500,
            'sku' => 'SOL-2026-X1',
            'image_url' => '/hero-product.png'
        ]);

        \App\Models\Product::create([
            'id' => 2,
            'name' => 'CÂBLE LI-ION PRECISION',
            'description' => 'Câble USB-C renforcé en fibre d\'aramide pour une durabilité extrême.',
            'price' => 39.00,
            'category' => 'ACCESSOIRE',
            'stock' => 1200,
            'sku' => 'SOL-ACC-C1',
            'image_url' => '/cable.png'
        ]);

        \App\Models\Product::create([
            'id' => 3,
            'name' => 'SUPPORT BUREAU CNC',
            'description' => 'Support ergonomique usiné dans la masse pour un alignement magnétique parfait.',
            'price' => 89.00,
            'category' => 'ACCESSOIRE',
            'stock' => 800,
            'sku' => 'SOL-ACC-S1',
            'image_url' => '/gallery_1.png'
        ]);

        \App\Models\Product::create([
            'id' => 4,
            'name' => 'ADAPTATEUR IONIC 45W',
            'description' => 'Adaptateur secteur haute efficacité optimisé pour la charge ultra-rapide.',
            'price' => 59.00,
            'category' => 'ACCESSOIRE',
            'stock' => 1500,
            'sku' => 'SOL-ACC-P1',
            'image_url' => '/gallery_2.png'
        ]);
    }
}
