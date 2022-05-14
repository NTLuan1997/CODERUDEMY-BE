import { httpsService } from "../commons/httpService.js";
import { deleteDocument } from "../commons/delete.js";
import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let pageRequire = 5;
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTableHeader = $("#course-table-header");
    let wrapperTablebody = $("#course-table-body");
    let titles = ["STT", "Họ và tên", "Email", "Số điện thoại", "Địa chỉ", "Chức năng"];

    (function () {
        httpsService(`API/client/manager-client`, "POST", {limit: `${pageRequire}`, start: 0})
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                renderHeaderTable(wrapperTableHeader, titles);

                console.log(res);
                renderPagination(wrapperPagination, 5, res.length, "API/client/manager-client", (e) => {
                    renderBodyTable(wrapperTablebody, e?.clients, ["_id","Password", "Gender", "DateOfBirth", "Thumbnail", "RegisterCourse", "__v"], "clients", null, null);
                    deleteDocument($$(".btn-delete-document"), "API/client/client");
                }, null);
                return res;

            })
            .then((res) => {
                renderBodyTable(wrapperTablebody, res?.clients, ["_id", "Password", "Gender", "DateOfBirth", "Thumbnail", "RegisterCourse", "__v"], "clients", null, null);
                deleteDocument($$(".btn-delete-document"), "API/client/client");

            })
            .catch((err) => {
                throw err;
            })
    })();
}