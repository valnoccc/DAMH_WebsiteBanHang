<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietDonHang extends Model
{
    use HasFactory;

    protected $table = 'ChiTietDonHang';
    public $timestamps = false; // Bảng này không có timestamps

    // --- THÊM ĐOẠN NÀY ---
    protected $fillable = [
        'don_hang_id',
        'bien_the_id',
        'so_luong',
        'don_gia',
    ];
    
    // Quan hệ: 1 chi tiết thuộc 1 đơn hàng
    public function donHang()
    {
        return $this->belongsTo(DonHang::class, 'don_hang_id', 'id');
    }

    // Quan hệ: 1 chi tiết là 1 biến thể sản phẩm
    public function bienThe()
    {
        return $this->belongsTo(BienTheSanPham::class, 'bien_the_id', 'id');
    }
}