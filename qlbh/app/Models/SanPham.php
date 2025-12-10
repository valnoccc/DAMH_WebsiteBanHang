<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    use HasFactory;

    protected $table = 'SanPham';
    public $timestamps = false;

    protected $fillable = [
        'ten_san_pham',
        'mo_ta',
        'gia_goc',
        'danh_muc_id',
        'slug'
    ];
    
    // Quan hệ: 1 sản phẩm thuộc 1 danh mục
    public function danhMuc()
    {
        return $this->belongsTo(DanhMuc::class, 'danh_muc_id', 'id');
    }

    // Quan hệ: 1 sản phẩm có nhiều hình ảnh
    public function hinhAnh()
    {
        return $this->hasMany(HinhAnhSanPham::class, 'san_pham_id', 'id');
    }

    // Quan hệ: 1 sản phẩm có nhiều biến thể
    public function bienThe()
    {
        return $this->hasMany(BienTheSanPham::class, 'san_pham_id', 'id');
    }
}