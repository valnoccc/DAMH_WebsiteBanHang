<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{
    use HasFactory;

    protected $table = 'GioHang';
    public $timestamps = false;

    // --- THÊM ĐOẠN NÀY ---
    protected $fillable = [
        'user_id',
        'bien_the_id',
        'so_luong',
    ];
    // ---------------------

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function bienThe()
    {
        return $this->belongsTo(BienTheSanPham::class, 'bien_the_id', 'id');
    }
}
