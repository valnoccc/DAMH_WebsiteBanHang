<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HinhAnhSanPham extends Model
{
    use HasFactory;

    protected $table = 'HinhAnhSanPham';
    public $timestamps = false;

    // Quan hệ: 1 hình ảnh thuộc 1 sản phẩm
    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'san_pham_id', 'id');
    }
}