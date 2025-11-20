<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

// Import các Controller Public
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;

// Import các Controller Admin
use App\Http\Controllers\AdminController;
// THÊM DÒNG NÀY: Đổi tên để không bị trùng với ProductController của khách
use App\Http\Controllers\Admin\ProductController as AdminProductController; 

// ==========================================
// 1. PUBLIC ROUTES (Ai cũng xem được)
// ==========================================
Route::get('/', [HomeController::class, 'index']);

// Sản phẩm & Chi tiết
Route::get('/san-pham', [ProductController::class, 'index'])->name('products.index');
Route::get('/san-pham/{id}', [ProductController::class, 'show'])->name('product.detail');

// Giỏ hàng (Cho phép xem, nhưng thêm/sửa/xóa sẽ check auth trong controller)
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/{itemKey}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{itemKey}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

// ==========================================
// 2. CUSTOMER ROUTES (Phải đăng nhập)
// ==========================================
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Thanh toán
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
    
    // Lịch sử đơn hàng
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');
});

// ==========================================
// 3. ADMIN ROUTES (Phải là Admin)
// ==========================================
// Lưu ý: Đảm bảo bạn đã có Middleware RoleMiddleware hoạt động
Route::middleware(['auth', App\Http\Middleware\RoleMiddleware::class . ':admin'])
    ->prefix('admin') // Thêm tiền tố /admin cho URL đẹp hơn
    ->group(function () {
        
        // Dashboard
        Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        // --- QUẢN LÝ SẢN PHẨM ---
        Route::get('/products', [AdminProductController::class, 'index'])->name('admin.products.index'); // Xem danh sách
        Route::get('/products/create', [AdminProductController::class, 'create'])->name('admin.products.create'); // Form thêm mới
        Route::post('/products', [AdminProductController::class, 'store'])->name('admin.products.store'); // Lưu DB
        Route::delete('/products/{id}', [AdminProductController::class, 'destroy'])->name('admin.products.destroy'); // Xóa
        
        // (Sau này bạn thêm Quản lý Đơn hàng, Danh mục ở đây...)
    });

require __DIR__.'/auth.php';