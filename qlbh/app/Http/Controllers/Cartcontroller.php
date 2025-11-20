<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SanPham;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index()
    {
        $cart = session()->get('cart', []);
        $cartItems = $cart;
        $total = 0;
        $itemCount = count($cartItems);

        // If some items lack image URL (older sessions), try to fetch from DB and persist
        $updated = false;
        foreach ($cartItems as $key => $item) {
            // Tính tổng giá (use values already present)
            $total += ($item['gia_ban'] ?? 0) * ($item['quantity'] ?? 0);

            if (empty($item['hinh_anh_url']) && !empty($item['san_pham_id'])) {
                $sp = SanPham::with('hinh_anh')->find($item['san_pham_id']);
                if ($sp && !empty($sp->hinh_anh) && isset($sp->hinh_anh[0]->url)) {
                    $cartItems[$key]['hinh_anh_url'] = $sp->hinh_anh[0]->url;
                    // persist back to session for future
                    $cart[$key]['hinh_anh_url'] = $sp->hinh_anh[0]->url;
                    $updated = true;
                }
            }
        }

        if ($updated) {
            session()->put('cart', $cart);
        }

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
            'itemCount' => $itemCount,
        ]);
    }

    /**
     * Add a product to cart.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'san_pham_id' => 'required|integer',
            'size' => 'required|string',
            'color' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'gia_ban' => 'required|numeric',
            'ten_san_pham' => 'required|string',
            'hinh_anh_url' => 'nullable|string',
        ]);

        $cart = session()->get('cart', []);
        
        // Tạo unique key cho item (product + size + color)
        $itemKey = $validated['san_pham_id'] . '_' . $validated['size'] . '_' . $validated['color'];

        // Nếu item đã tồn tại, cộng quantity
        if (isset($cart[$itemKey])) {
            $cart[$itemKey]['quantity'] += $validated['quantity'];
            // Cập nhật ảnh nếu có
            if (!empty($validated['hinh_anh_url'])) {
                $cart[$itemKey]['hinh_anh_url'] = $validated['hinh_anh_url'];
            }
        } else {
            // Thêm item mới
            $cart[$itemKey] = [
                'san_pham_id' => $validated['san_pham_id'],
                'ten_san_pham' => $validated['ten_san_pham'],
                'size' => $validated['size'],
                'color' => $validated['color'],
                'gia_ban' => $validated['gia_ban'],
                'quantity' => $validated['quantity'],
                'hinh_anh_url' => $validated['hinh_anh_url'] ?? null,
            ];
        }

        session()->put('cart', $cart);

        return redirect()->back()->with('success', 'Đã thêm vào giỏ hàng!');
    }

    /**
     * Update quantity of item in cart.
     */
    public function update(Request $request, string $itemKey)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);

        if (isset($cart[$itemKey])) {
            $cart[$itemKey]['quantity'] = $validated['quantity'];
            session()->put('cart', $cart);
        }

        return redirect()->back()->with('success', 'Cập nhật số lượng thành công!');
    }

    /**
     * Remove an item from cart.
     */
    public function destroy(string $itemKey)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$itemKey])) {
            unset($cart[$itemKey]);
            session()->put('cart', $cart);
        }

        return redirect()->back()->with('success', 'Đã xóa khỏi giỏ hàng!');
    }

    /**
     * Clear entire cart.
     */
    public function clear()
    {
        session()->forget('cart');
        return redirect()->back()->with('success', 'Giỏ hàng đã được xóa!');
    }
}
