<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{
    use HasFactory;

<<<<<<< HEAD
    protected $table = 'giohang';
    public $timestamps = false; // Bảng này chỉ có created_at
=======
    protected $table = 'GioHang';
    public $timestamps = false;

    // --- THÊM ĐOẠN NÀY ---
    protected $fillable = [
        'user_id',
        'bien_the_id',
        'so_luong',
    ];
    // ---------------------
>>>>>>> UserFeatures

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function bienThe()
    {
        return $this->belongsTo(BienTheSanPham::class, 'bien_the_id', 'id');
    }
}
