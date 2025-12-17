<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\DonHang;
use App\Models\SanPham;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function dashboard()
    {
        // 1. Thống kê tổng quan (Cards)
        $totalRevenue = DonHang::where('trang_thai', 'completed')->sum('tong_tien');
        $totalOrders = DonHang::count();
        $totalProducts = SanPham::count();
        $totalUsers = User::where('role', 'user')->count();

        // 2. Biểu đồ Doanh thu 6 tháng gần nhất (Line/Bar Chart)
        $revenueData = DonHang::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(tong_tien) as total')
        )
        ->where('trang_thai', 'completed')
        ->where('created_at', '>=', Carbon::now()->subMonths(6)) // Lấy 6 tháng gần đây
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        // Chuẩn bị dữ liệu cho Chart.js (Mảng 12 tháng, tháng nào không có thì = 0)
        $months = [];
        $revenues = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i)->month;
            $monthName = "Tháng " . $month;
            $months[] = $monthName;
            
            $data = $revenueData->firstWhere('month', $month);
            $revenues[] = $data ? $data->total : 0;
        }

        // 3. Biểu đồ Trạng thái đơn hàng (Doughnut/Pie Chart)
        $orderStatus = DonHang::select('trang_thai', DB::raw('count(*) as total'))
            ->groupBy('trang_thai')
            ->pluck('total', 'trang_thai')
            ->toArray();

        // Đảm bảo đủ các key để không lỗi JS
        $statusData = [
            $orderStatus['pending'] ?? 0,
            $orderStatus['processing'] ?? 0,
            $orderStatus['shipped'] ?? 0,
            $orderStatus['completed'] ?? 0,
            $orderStatus['cancelled'] ?? 0,
        ];

        // 4. Đơn hàng mới nhất (Table nhỏ)
        $recentOrders = DonHang::with('user')
            ->orderByDesc('created_at')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'revenue' => $totalRevenue,
                'orders' => $totalOrders,
                'products' => $totalProducts,
                'users' => $totalUsers,
            ],
            'chartRevenue' => [
                'labels' => $months,
                'data' => $revenues
            ],
            'chartStatus' => [
                'data' => $statusData
            ],
            'recentOrders' => $recentOrders
        ]);
    }
}