<?php
use App\Models\User;
use Illuminate\Support\Facades\Hash;
$admin = User::firstWhere('role', 'admin');
if (!$admin) {
    echo "Creating new admin account...\n";
    $admin = new User();
    $admin->name = 'Admin Solaris';
    $admin->email = 'admin@solaris.com';
    $admin->role = 'admin';
}
$admin->password = Hash::make('password');
$admin->save();
echo "EMAIL: " . $admin->email . "\n";
echo "PASSWORD: password\n";
