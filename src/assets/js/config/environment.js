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
        "contentLinked": "Xóa nội dung liên kết",
        "registerAlready": "Email đã được đăng ký.",
        "missingPermission": "Không đủ quyền thực thi chức năng.",
        "tokenBlank": "Mã xác thực trống.",
        "tokenExpired": "Mã xác thực quá hạn.",
    },
    "options": {
        "course": {
            DocumentKeys: ["Name", "Author", "Type", "Unit", "CreateDate"],
            HeaderTitles: ["Họ và tên", "Tác giả", "Loại khóa học", "Học phần", "Ngày tạo"],
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