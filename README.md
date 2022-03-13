<!--
    HTTP PROTOCOL: HYPER TEXT TRANSFER PROTOCOL.
        1) Http Request:
            - Là gói tin được xây dựng ở phía client gửi sang cho phía server.
            - Thành phần chính:
                + Request URL (EndPoint).
                    - Thường có định dạng  => http/https://domain/path? Query String key = Value

                + Request Method.
                    - GET/POST/PUT/DELETE/PATCH ...

                + Request Headers.
                    - User-agent/ Accept/ Accept-Endcoding/ Content-Type/ Content-length/ connection/ Cache-Control

                + Request body.
                    - Form-data/ x-www-form-urlencoded/ binary/ grapQL/ raw(Text/ Javascript/ JSON/ XLM/ HTML)


            - Nội dung của request/ response.

                + Request body.
                    - (Request có phần thân hay không).

                + Response body.
                    - (Respone trả về có thân hay không).

                + Safe.
                    - (Có an toàn hay không).

                + Idempotent.
                    -(Tính bất biến - chúng ta request nhiều lần phần thân có thay đổi hay không).

                + Cacheable.
                    - (Dự liệu có được lưu trữ vào vùng nhớ tạm hay không). Request body?   Response body?  Safe    Idempotent  Cacheable

            GET     Option          Yes         Yes         Yes         Yes

            HRAD    Option           No         Yes         Yes         Yes

            POST    Yes             Yes         No          No          Yes

            PUT     Yes             Yes         No          Yes         No

            DELETE  Option          Yes         No          Yes         No


        2) Http Response:
            - Thành phần chính:
                + Response status code (Mã trạng thái).
                    - Là các số nguyên có 3 chữ số.
                    - Chữ số đầu tiên được dùng xác định mã nằm trong danh sách cụ thể
                    - Nhóm:
                        + 1xx Informational.
                        + 2xx Successfull.
                        + 3xx Redirection.
                        + 4xx Client Error.
                        + 5xx Server Error.

                + Respone Header:
                    - User-agent/ Accept/ Accept-Endcoding/ Content-Type/ Content-length/ connection/ Cache-Control

                + Respone Body:
                    - Text/ Javascript/ JSON/ HTML/ XML ...

    SSR Và CSR:
        - Server side rendering.
            + Render giao diện ở phía server trả về.

        - Client side rendering.
            + Render giao diện ở phía người dùng.


    LIBRARY:
        - Express
        - Nodemon
        - Morgan
        - Template engine
            + express-handlebars
            + pug

        - Node-sass
        - Body-parse (middleware)
        - Mongoose
        - Mongoose-slug-generation
        - Kỹ thuật soft delete (xóa mềm)
            + xóa tạm trên giao diện khoông xóa trong db.
            + Phục hồi dữ liệu đã xóa tạm thời đi.
            + Xóa thật trong db.

        - Middleware Khái niệm:
            + Ý nghĩa:
                Phần mềm trung gian (đứng giữa các thanh phần).

            + Vai trò: 
                Sử lý trao đổi thông tin/ kiểm tra dữ liệu/ ...

            + Cách thức hoạt động:

                - Mô hìfnh nội dung:
                    Browser (client) ==================> Request ==================> Server (Node)

                    Browser (client) <================== Request <================== Server (Node)

                - VD:
                    Nhà ===========================> Bác bảo về : sự kiện (soát vé)

                    Nhà ===========================> Sự kiện


                    1) Tiến hành soát vé
                    2) Không cho vào
                    3) Cho phép vào (Validation pass -> cho vào)
                    4) Chỉnh sửa/ thay đổi

        - Sử lý transaction trong nodeJs và Mongodb
            - Thư viện: mongo-sequence.


    Session - Cookie:
        - Cookie: Khái niệm
            - Cookie lưu giữ thông tin người dùng trên web page.
            - Cookie được lưu dưới daạng "Name=value".
              cú pháp: username = "John Doe"
            - VD: document.cookie = "username=John Doe";


    Mô hình MVC:
        - Kỹ thuật phân trang:
        - VD: Khách hàng mong muốn tạo phân trang trên page sản phẩm mỗi lần tải lên 4 sản phẩm và biết tổng số sản phẩm hiện có là 17 sản phẩm và được lưu trong database.

        - Những thông số cần biết:
            + Số tinh một trang : 4 sản phẩm trên một trang.
            + Tổng số tinh hiện có: 17 sản phẩm có trong database.
            + Tổng số trang: (Tổng số tinh hiện có / Số tinh một trang ) => Math.ceil(17 / 4) = 4.x => làm tròn lên là 5.
            + Lấy về trang hiện tại khi user click vào phân trang.

            + Cách tính thông số truy vấn.
            + Câu lệnh truy vấn ví dụ: giải sử bạn đang ở trang 1

                - Select * from <name_table> limit 0(Con số bắt đầu truy vấn), 4(Số tinh một trang khác hàng yêu cầu)
                - Công thức tính "Con số bắt đầu truy vấn"
                    + Số tinh một trang * (Số trang hiện tại - 1);
                    + VD:
                        = Bạn đang ở trang 1, số tinh một trang hiện ra theo yêu cầu khách hàng là 4 ta tính như sau:

                        4 * (1 - 1) = 0;        => Select * from <name_table> limit 0,4;
                        4 * (2 - 1) = 4;        => Select * from <name_table> limit 4,4;
                        4 * (3 - 1) = 8;        => Select * from <name_table> limit 8,4;
                        ....
        
-->