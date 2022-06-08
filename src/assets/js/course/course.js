import { Cookie } from "../lib/cookie.js";
import Delete from "../commons/delete.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/https.js";
import { View } from "../lib/view.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const deleted = new Delete();
    const https = new HTTPS();
    const view = new View();
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    environment.payload.type = "Limited";
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
        .then(() => {
            deleted.method('delete', environment.endpoint.course);
        })
        .then(() => {
            redirect();
        })
        .catch((err) => {
            throw err;
        })
    })()

    function redirect() {
        $$(".unit").forEach((unit) => {
            unit.addEventListener("click", function(e) {
                e.preventDefault();
                localStorage.setItem("UnitToken", this.dataset.id);
                window.location.href = "course/unit";
            })
        })
    }
}