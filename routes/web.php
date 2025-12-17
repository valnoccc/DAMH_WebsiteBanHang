<?php

<<<<<<< HEAD
namespace App\Http\Controllers;

=======
>>>>>>> UserFeatures
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

<<<<<<< HEAD
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
=======
// Import các Controller Public
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CategoryController;

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

        Route::get('/products/{id}/edit', [AdminProductController::class, 'edit'])->name('admin.products.edit'); // Form sửa
        Route::post('/products/{id}', [AdminProductController::class, 'update'])->name('admin.products.update'); // Lưu cập nhật

        Route::delete('/product-images/{id}', [AdminProductController::class, 'deleteImage'])->name('admin.product-images.destroy');

        // --- QUẢN LÝ ĐƠN HÀNG ---
        Route::get('/orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('admin.orders.index');
        Route::get('/orders/{id}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('admin.orders.show');
        Route::patch('/orders/{id}', [App\Http\Controllers\Admin\OrderController::class, 'update'])->name('admin.orders.update');

        // --- QUẢN LÝ NGƯỜI DÙNG ---
        Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::patch('/users/{id}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');

        // --- QUẢN LÝ DANH MỤC ---
        Route::resource('categories', CategoryController::class)->names([
            'index'   => 'admin.categories.index',
            'create'  => 'admin.categories.create',
            'store'   => 'admin.categories.store',
            'edit'    => 'admin.categories.edit',
            'update'  => 'admin.categories.update',
            'destroy' => 'admin.categories.destroy',
        ]);
    });

require __DIR__ . '/auth.php';
>>>>>>> UserFeatures
