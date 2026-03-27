<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReturnRequestController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:6,1');

// Protected User Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/return-requests', [ReturnRequestController::class, 'store']);
});

// Admin Routes (Catalogue & Stock & Dashboard)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/dashboard-stats', [AdminController::class, 'dashboardStats']);
    Route::apiResource('products', ProductController::class);
    Route::get('/return-requests', [ReturnRequestController::class, 'index']);
    Route::put('/return-requests/{returnRequest}', [ReturnRequestController::class, 'update']);
    Route::put('/orders/{order}', [OrderController::class, 'update']);
});

// Public Product Routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
