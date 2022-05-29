import { Cookie } from "../lib/cookie.js";
import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/httpService.js";
// import { deleteDocument } from "../commons/delete.js";
// import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    const cookie = new Cookie();
    const https = new HTTPS();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    environment.payload.type = "limited";
    environment.payload.start = 0;
    environment.payload.limited = 5;

    // let pageRequire = 5;
    // let wrapperPagination = $$(".pagination")[0];
    // let wrapperTableHeader = $("#user-table-header");
    // let wrapperTablebody = $("#user-table-body");
    // let titles = ["STT", "Tên người dùng", "Email", "Trạng thái", "Quyền", "Chức năng"];

    (function () {
        https.FIND(environment.payload, token, environment.endpoint.user)
        .then((res) => {
            console.log(res);
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