import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/httpService.js";
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
        environment.payload.type = "limited";
        environment.payload.start = 0;
        environment.payload.limited = 5;
        environment.payload.id = origin.parameter().token;

        let ComponentHeader = $("#Header");
        let ComponentView = $("#Body");
        let KeyComponent = ["Name", "AmountLesson", "Status", "CreateDate"];
        let KeyHeader = ["Tên học phần", "Số khóa học", "Trạng thái", "Ngày tạo", "Chúc năng"];

        (function() {
            https.FIND(environment.payload, token, environment.endpoint.unit)
            .then((res) => {
                view.render(res, ComponentHeader, KeyHeader, ComponentView, KeyComponent);
            })
            .catch((err) => {
                throw err;
            })
        }());

//     (function () {
//         routerNew.setAttribute("href", location.href.replace("?", "/detail?type=create&"));

//         httpsService(`API/unit/unit?limit=${pageRequire}&start=0&courseId=${courseId}`, "GET", null)
//             .then((data) => {
//                 return data.json();
//             })
//             .then((data) => {
//                 console.log(data.units);
//                 renderHeaderTable(wrapperTableHeader, titles);
//                 renderPagination(wrapperPagination, 5, data.length, "API/unit/unit", (e) => {
//                     renderBodyTable(wrapperTablebody, e?.units, ["_id", "__v", "lessons"], "courses/units", "lessons", "unitId");
//                     deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
//                 }, condition);
//                 return data;
//             })
//             .then((data) => {
//                 renderBodyTable(wrapperTablebody, data?.units, ["_id", "__v", "lessons"], "courses/units", "lessons", "unitId");
//                 deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     })()
}