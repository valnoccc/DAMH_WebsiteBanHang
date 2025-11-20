<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

// Import các Controller bạn cần
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AdminController;


// 1. Route cho Trang Chủ
Route::get('/', [HomeController::class, 'index']);

// 2. Route cho Trang Danh Sách Sản Phẩm
Route::get('/san-pham', [ProductController::class, 'index'])->name('products.index');

// 3. Route cho Trang Chi Tiết Sản Phẩm
Route::get('/san-pham/{id}', [ProductController::class, 'show'])->name('product.detail');

// 4. Route cho Giỏ Hàng
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/{itemKey}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{itemKey}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes - protected by auth + role middleware (class-based)
Route::middleware(['auth', App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    // Add more admin routes here
});

require __DIR__.'/auth.php';