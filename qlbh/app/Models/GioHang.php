<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{
    use HasFactory;

    protected $table = 'GioHang';
    public $timestamps = false; // Bảng này chỉ có created_at

    // Quan hệ: 1 giỏ hàng thuộc 1 người dùng
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Quan hệ: 1 giỏ hàng là 1 biến thể sản phẩm
    public function bienThe()
    {
        return $this->belongsTo(BienTheSanPham::class, 'bien_the_id', 'id');
    }
}