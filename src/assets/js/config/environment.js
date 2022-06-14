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
        "password-Incorrect": "Password không chính xác.",
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
        "registerAlready": "Email đã được đăng ký.",
        "missingPermission": "Không đủ quyền thực thi chức năng.",
        "tokenBlank": "Mã xác thực trống.",
        "tokenExpired": "Mã xác thực quá hạn.",
    }
}