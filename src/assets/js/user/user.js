import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/httpService.js";
import { View } from "../lib/view.js";
// import { deleteDocument } from "../commons/delete.js";
// import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const https = new HTTPS();
    const view = new View();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    environment.payload.type = "limited";
    environment.payload.start = 0;
    environment.payload.limited = 5;

    // let pageRequire = 5;
    // let wrapperPagination = $$(".pagination")[0];

    let ComponentHeader = $("#Header");
    let ComponentView = $("#Body");
    let KeyComponent = ["Name", "Email", "DateOfBirth", "Role", "Status"];
    let KeyHeader = ["Họ và tên", "Email", "Ngày/Tháng/Năm sinh", "Quyền", "Trạng thái", "Chúc năng"];

    (function () {
        https.FIND(environment.payload, token, environment.endpoint.user)
        .then((res) => {
            view.render(res, ComponentHeader, KeyHeader, ComponentView, KeyComponent);
        })
        .catch((err) => {
            throw err;
        })

        // httpsService(`API/user/home?limit=${pageRequire}&start=0`, "GET", null)
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((data) => {
        //         renderHeaderTable(wrapperTableHeader, titles);
        //         renderPagination(wrapperPagination, 5, data.length, "API/user/home", (e) => {
        //             renderBodyTable(wrapperTablebody, e?.users, ["_id", "password", "skills", "dateOfBirth", "__v", "courses"], "users", null, null);
        //             deleteDocument($$(".btn-delete-document"), "API/user/user-remove");
        //         }, null);
        //         return data;
        //     })
        //     .then((data) => {
        //         renderBodyTable(wrapperTablebody, data?.users, ["_id", "password", "skills", "dateOfBirth", "__v", "courses"], "users", null, null);
        //         deleteDocument($$(".btn-delete-document"), "API/user/user-remove");
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    })();

}