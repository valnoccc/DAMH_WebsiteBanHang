// Hàm định dạng tiền tệ
export const formatCurrency = (number) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(number);
};

// Hàm tìm ảnh: ưu tiên thumbnail, nếu không có thì lấy ảnh đầu tiên
export const getProductImage = (hinhAnhArray) => {
    if (!hinhAnhArray || hinhAnhArray.length === 0) {
        return 'https://via.placeholder.com/400'; // Ảnh dự phòng
    }
    const thumbnail = hinhAnhArray.find(img => img.is_thumbnail);
    // Nếu có URL thì trả về, không thì ảnh dự phòng
    let url = (thumbnail || hinhAnhArray[0])?.url;
    if (!url) return 'https://via.placeholder.com/400';

    // Nếu URL đã là đường dẫn tuyệt đối (http/https) hoặc bắt đầu bằng '/', sử dụng trực tiếp
    if (/^https?:\/\//i.test(url) || url.startsWith('/')) {
        return url;
    }

    // Nếu URL là đường dẫn relative (ví dụ: 'images/..' hoặc 'storage/...'), đặt tiền tố '/storage/' nếu cần
    if (url.startsWith('storage/')) {
        return '/' + url;
    }

    return '/storage/' + url;
};