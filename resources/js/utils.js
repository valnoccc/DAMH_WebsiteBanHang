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
    const url = (thumbnail || hinhAnhArray[0])?.url;
    return url || 'https://via.placeholder.com/400';
};