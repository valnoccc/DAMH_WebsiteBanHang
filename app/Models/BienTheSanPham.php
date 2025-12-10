<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BienTheSanPham extends Model
{
    use HasFactory;

    protected $table = 'bienthesanpham';
    public $timestamps = false;

    // Quan hệ: 1 biến thể thuộc 1 sản phẩm
    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'san_pham_id', 'id');
    }

    // Quan hệ: 1 biến thể có 1 ảnh đại diện (có thể null)
    public function hinhAnh()
    {
        return $this->belongsTo(HinhAnhSanPham::class, 'hinh_anh_id', 'id');
    }
}
