<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonHang extends Model
{
    use HasFactory;

    protected $table = 'donhang';
    public $timestamps = false; // Bảng này chỉ có created_at, không có updated_at

    // Quan hệ: 1 đơn hàng thuộc 1 người dùng
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Quan hệ: 1 đơn hàng có nhiều chi tiết (sản phẩm)
    public function chiTiet()
    {
        return $this->hasMany(ChiTietDonHang::class, 'don_hang_id', 'id');
    }
}
