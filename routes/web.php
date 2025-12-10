<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

// Import các Controller bạn cần
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Đây là nơi bạn định nghĩa các route cho web.
|
*/

// === CÁC ROUTE CHO SHOP CỦA BẠN ===

// 1. Route cho Trang Chủ
Route::get('/', [HomeController::class, 'index']);

// 2. Route cho Trang Danh Sách Sản Phẩm
Route::get('/san-pham', [ProductController::class, 'index'])->name('products.index');


// === CÁC ROUTE CÓ SẴN CỦA BREEZE (ĐĂNG NHẬP/ĐĂNG KÝ) ===
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';