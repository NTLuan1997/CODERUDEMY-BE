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
    let KeyComponent = ["Name", "Lesson", "Status", "CreateDate"];
    let KeyHeader = ["Tên học phần", "Số khóa học", "Trạng thái", "Ngày tạo", "Chúc năng"];

    (function(){
        if(localStorage.getItem("CourseToken")) {
            let payload = {
                id: localStorage.getItem("CourseToken"),
                type: "FindAll"
            }

            https.FIND(payload, token, environment.endpoint.unit)
            .then((result) => {
                view.render(result, ComponentHeader, KeyHeader, ComponentView, KeyComponent);
            })
            .then(() => {
                redirect();
            })
            .catch((err) => {
                throw err;
            })
        }
    }())

    function redirect() {
        $$(".lesson").forEach((unit) => {
            unit.addEventListener("click", function(e) {
                e.preventDefault();
                localStorage.setItem("UnitToken", this.dataset.id);
                window.location.href = "unit/lesson";
            })
        })
    }
}