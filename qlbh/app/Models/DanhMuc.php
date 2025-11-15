<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhMuc extends Model
{
    use HasFactory;

    protected $table = 'DanhMuc';
    public $timestamps = false;

    // Quan hệ: 1 danh mục có nhiều sản phẩm
    public function sanPhams()
    {
        return $this->hasMany(SanPham::class, 'danh_muc_id', 'id');
    }

    // Quan hệ: 1 danh mục con thuộc 1 danh mục cha
    public function parent()
    {
        return $this->belongsTo(DanhMuc::class, 'parent_id', 'id');
    }

    // Quan hệ: 1 danh mục cha có nhiều danh mục con
    public function children()
    {
        return $this->hasMany(DanhMuc::class, 'parent_id', 'id');
    }
}