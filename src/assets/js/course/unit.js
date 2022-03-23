import { httpsService } from "../commons/httpService.js";
import { deleteDocument } from "../commons/delete.js";
import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let pageRequire = 5;
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTableHeader = $("#unit-table-header");
    let wrapperTablebody = $("#unit-table-body");
    let titles = ["STT", "Mã khóa học", "Tên chương học", "Số lượng bài học", "Ngày tạo", "Lần cập nhật cuối", "Quyền"];

    (function () {
        httpsService(`API/unit/unit-home?limit=${pageRequire}&start=0`, "GET", null)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                renderHeaderTable(wrapperTableHeader, titles);
                renderPagination(wrapperPagination, 5, data.length, "API/unit/unit-home", (e) => {
                    renderBodyTable(wrapperTablebody, e?.courses, ["_id", "__v"], "units");
                    deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
                });
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTablebody, data?.courses, ["_id", "__v"], "units");
                deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
            })
            .catch((err) => {
                console.log(err);
            })
    })()
}