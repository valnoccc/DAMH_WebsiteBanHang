<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Giới thiệu (Introduction)
Dự án **Website Bán Hàng** là sản phẩm thuộc Đồ án môn học (DAMH), được xây dựng nhằm cung cấp giải pháp mua sắm quần áo thời trang trực tuyến. Hệ thống cung cấp đầy đủ các tính năng từ xem sản phẩm, tìm kiếm, quản lý giỏ hàng đến thanh toán trực tuyến.

## Tính năng nổi bật (Key Features)

### Dành cho Khách hàng (User Client)
- **Trang chủ hiện đại:** Hiển thị sản phẩm mới, sản phẩm bán chạy.
- **Tìm kiếm thông minh:** Tìm kiếm sản phẩm theo tên, lọc theo danh mục hoặc mức giá.
- **Giỏ hàng (Cart):** Thêm/sửa/xóa sản phẩm, tự động tính tổng tiền.
- **Thanh toán (Payment):**
  - Thanh toán khi nhận hàng (COD).
  - Tích hợp cổng thanh toán **MoMo** (Môi trường Test/Sandbox).
- **Quản lý tài khoản:** Đăng ký, đăng nhập, xem lịch sử đơn hàng.

### Dành cho Quản trị viên (Admin Panel)
- **Dashboard:** Thống kê doanh thu, số lượng đơn hàng.
- **Quản lý sản phẩm:** Thêm, sửa, xóa, cập nhật hình ảnh và giá sản phẩm.
- **Quản lý đơn hàng:** Xem chi tiết đơn hàng, cập nhật trạng thái (Đang xử lý, Đã giao, Hủy).
- **Quản lý người dùng:** Quản lý danh sách khách hàng.

## Công nghệ sử dụng (Tech Stack)
- **Backend:** PHP, Laravel Framework.
- **Database:** MySQL.
- **Frontend:** Reactjs, Tailwincss.
- **Payment Gateway:** MoMo API.

## Cài đặt & Chạy dự án (Installation)

Yêu cầu: PHP >= 8.1, Composer, MySQL.

1. **Clone dự án:**
   ```bash
   git clone [https://github.com/valnoccc/DAMH_WebsiteBanHang.git](https://github.com/valnoccc/DAMH_WebsiteBanHang.git)
   cd DAMH_WebsiteBanHang
