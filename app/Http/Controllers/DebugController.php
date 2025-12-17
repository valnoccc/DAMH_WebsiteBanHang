<?php

namespace App\Http\Controllers;

use App\Models\SanPham;

class DebugController extends Controller
{
    public function showProduct($id)
    {
        $product = SanPham::with(['danhMuc', 'hinhAnh', 'bienThe'])->find($id);
        
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        
        return response()->json($product);
    }
}
