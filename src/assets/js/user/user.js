import { deleteDocument } from "../commons/delete.js";
import { httpsService } from "../commons/httpService.js";
import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let pageRequire = 5;
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTableHeader = $("#user-table-header");
    let wrapperTablebody = $("#user-table-body");
    let titles = ["STT", "Tên người dùng", "Email", "Password", "Trạng thái", "Tuổi", "Chức năng"];

    (function () {
        httpsService(`API/user/home?limit=${pageRequire}&start=0`, "GET", null)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                renderHeaderTable(wrapperTableHeader, titles);
                renderPagination(wrapperPagination, 5, data.length, "API/user/home", (e) => {
                    renderBodyTable(wrapperTablebody, e?.users, ["_id", "skills", "__v"], "users", null, null);
                    deleteDocument($$(".btn-delete-document"), "API/user/remove");
                }, null);
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTablebody, data?.users, ["_id", "skills", "__v"], "users", null, null);
                deleteDocument($$(".btn-delete-document"), "API/user/remove");
            })
            .catch((err) => {
                console.log(err);
            })
    })();

}