import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/httpService.js";
import { Cookie } from "../lib/cookie.js";
import { View } from "../lib/view.js";

window.onload = function (e) {
    const https = new HTTPS();
    const cookie = new Cookie();
    const view = new View();
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    environment.payload.type = "limited";
    environment.payload.start = 0;
    environment.payload.limit = 5;

    let pageRequire = 5;
    let Pagination = $$(".pagination")[0];
    let ComponentHeader = $("#Header");
    let ComponentView = $("#Body");
    let KeyComponent = ["Name", "Email", "Gender", "Phone", "DateOfBirth", "Address"];
    let KeyHeader = ["Họ và tên", "Email", "Giới tính", "Điện thoại", "Ngày/Tháng/Năm sinh", "Địa chỉ", "Chúc năng"];

    (function () {
        https.FIND(environment.payload, token, environment.endpoint.client)
        .then((res) => {
            view.setUrl(environment.endpoint.client);
            view.render(res, ComponentHeader, KeyHeader, ComponentView, KeyComponent);
        })
        .catch((err) => {
            throw err;
        })
    })();
}