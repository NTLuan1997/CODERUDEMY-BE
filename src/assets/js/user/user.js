import { Cookie } from "../lib/cookie.js";
import  Delete from "../lib/delete.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import { View } from "../lib/view.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const deleted = new Delete();
    const https = new HTTPS();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    environment.payload.type = "limited";
    environment.payload.start = 0;
    environment.payload.limited = 5;

    let ComponentHeader = $("#Header");
    let ComponentView = $("#Body");
    let KeyComponent = ["Name", "Email", "DateOfBirth", "Role", "Status"];
    let KeyHeader = ["Họ và tên", "Email", "Ngày/Tháng/Năm sinh", "Quyền", "Trạng thái", "Chúc năng"];

    (function () {
        https.FIND(environment.payload, token, environment.endpoint.user)
        .then((res) => {
            view.setUrl(environment.endpoint.user);
            view.render(res, ComponentHeader, KeyHeader, ComponentView, KeyComponent);
        })
        .then(() => {
            deleted.method("delete", environment.endpoint.user);
        })
        .catch((err) => {
            throw err;
        })
    })();

}