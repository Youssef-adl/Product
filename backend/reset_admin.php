<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::where('email', 'admin@lodestone.com')->first();
if ($user) {
    $user->password = Illuminate\Support\Facades\Hash::make('admin123');
    $user->role = 'admin'; // Force it just in case
    $user->save();
    echo "SUCCESS: Password for admin@lodestone.com reset to admin123 (Role: " . $user->role . ")" . PHP_EOL;
} else {
    // If not exists, create it
    $user = App\Models\User::create([
        'name' => 'Admin Lodestone',
        'email' => 'admin@lodestone.com',
        'password' => Illuminate\Support\Facades\Hash::make('admin123'),
        'role' => 'admin',
    ]);
    echo "SUCCESS: Admin user created with email admin@lodestone.com and password admin123" . PHP_EOL;
}
