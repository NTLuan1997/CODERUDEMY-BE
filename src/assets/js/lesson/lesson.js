import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../lib/https.js";
import { View } from "../lib/view.js";
import Origin from "../lib/lib-origin.js";

window.onload = function (e) {

    const cookie = new Cookie();
    const https = new HTTPS();
    const origin = new Origin();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    let ComponentHeader = $("#Header");
    let ComponentView = $("#Body");
    let KeyComponent = ["Name", "Status", "CreateDate"];
    let KeyHeader = ["Tên học phần", "Trạng thái", "Ngày tạo", "Chúc năng"];
    let unitId = "";

    (function() {
        if(localStorage.getItem("UnitToken")) {
            unitId = localStorage.getItem("UnitToken");

            let payload = {
                id: localStorage.getItem("UnitToken"),
                type: "FindAll"
            }

            https.FIND(payload, token, environment.endpoint.lesson)
            .then((result) => {
                view.render(result, ComponentHeader, KeyHeader, ComponentView, KeyComponent);
            })
            .catch((err) => {
                throw err;
            })
        }
    }());
}