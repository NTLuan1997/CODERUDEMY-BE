export const environment = {
    "priture": {
        "url": "https://nguyenphuongduy.000webhostapp.com",
        // "url": "http://localhost/www/CODERUDEMY-IMG/index.php",
        "client": {
            "url": "https://nguyenphuongduy.000webhostapp.com",
            "location": "http://localhost/www/CODERUDEMY-IMG/index.php",
        }
    },
    "client": {
        Code: "",
        Name: "",
        Email: "",
        Password: 'P@ssword12345',
        Gender: "",
        DateOfBirth: "",
        Phone: "",
        Address: "",
        Type: "",
        Thumbnail: "",
        registerCourse: []
    },
    "error": {
        "passwordIncorrect": "Password không chính xác.",
    },
    "endpoint": {
        "authentication": "/API/authen/manager",
        "client": "/API/client/client",
        "course": "/API/course/course",
        "lesson": "/API/course/unit/lesson",
        "unit": "/API/course/unit",
        "user": "/API/user/user",
    },
    "payload": {
        type: "",
        token: "",
        id: "",
        start: "",
        status: false,
        limited: "",
    },
    "permission": {
        "chooseCourse": "Chọn khóa học trước khi thực hiện chức năng",
        "courseBlank": "Danh mục khóa học trống",
        "courseRegistered": "Khóa học có đăng ký chức năng không khả dụng",
        "contentLinked": "Xóa nội dung liên kết",
        "formInvalid": "Nhập nội dung không hợp lệ",
        "registerAlready": "Đã được đăng ký.",
        "missingPermission": "Không đủ quyền thực thi chức năng.",
        "tokenBlank": "Mã xác thực trống.",
        "tokenExpired": "Mã xác thực quá hạn.",
        "uploadPriture": "Cập hình ảnh không thành công",
    },
    "options": {
        "client": {
            DocumentKeys: ["Name", "Email", "Gender", "Phone", "Address"],
            HeaderTitles: ["Họ và tên", "Email", "Giới tính", "Điện thoại", "Địa chỉ"],
        },
        "course": {
            DocumentKeys: ["Name", "Author", "Type", "Unit", "Register", "CreateDate"],
            HeaderTitles: ["Họ và tên", "Tác giả", "Loại khóa học", "Học phần", "Số lượng đăng ký", "Ngày tạo"],
        },
        "lesson": {
            DocumentKeys: ["Name", "Status", "CreateDate"],
            HeaderTitles: ["Tên học phần", "Trạng thái", "Ngày tạo"],
        },
        "unit": {
            DocumentKeys: ["Name", "Lesson", "Status", "CreateDate"],
            HeaderTitles: ["Tên học phần", "Số khóa học", "Trạng thái", "Ngày tạo"],
        },
        "user": {
            DocumentKeys: ["Name", "Email", "DateOfBirth", "Role", "Status"],
            HeaderTitles: ["Họ và tên", "Email", "Ngày/Tháng/Năm sinh", "Quyền", "Trạng thái"],
        }
    }
}