import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/httpService.js";
import { View } from "../lib/view.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const https = new HTTPS();
    const view = new View();
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    environment.payload.type = "limited";
    environment.payload.start = 0;
    environment.payload.limited = 5;

    let ComponentHeader = $("#Header");
    let ComponentView = $("#Body");
    let KeyComponent = ["Name", "Author", "Type", "Unit", "CreateDate"];
    let KeyHeader = ["Họ và tên", "Tác giả", "Loại khóa học", "Học phần", "Ngày tạo", "Chúc năng"];

    (function () {
        https.FIND(environment.payload, token, environment.endpoint.course)
        .then((res) => {
            view.render(res, ComponentHeader, KeyHeader, ComponentView, KeyComponent);
        })
        .catch((err) => {
            throw err;
        })
    })()
}