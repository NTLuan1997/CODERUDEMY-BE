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
-->