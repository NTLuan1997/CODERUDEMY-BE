import { httpsService } from "../commons/httpService.js";
import { deleteDocument } from "../commons/delete.js";
import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let pageRequire = 5;
    let routerNew = $$(".header-router-link-detail")[0];
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTableHeader = $("#unit-table-header");
    let wrapperTablebody = $("#unit-table-body");
    let titles = ["STT", "Mã khóa học", "Chương học", "Bài học", "Trang thái", "Ngày tạo", "Lần cập nhật cuối", "Chức năng"];

    let courseId = location.search.split("=")[1];
    let condition = [`courseId=${courseId}`];

    (function () {
        routerNew.setAttribute("href", location.href.replace("?", "/detail?type=create&"));

        httpsService(`API/unit/unit?limit=${pageRequire}&start=0&courseId=${courseId}`, "GET", null)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data.units);
                renderHeaderTable(wrapperTableHeader, titles);
                renderPagination(wrapperPagination, 5, data.length, "API/unit/unit", (e) => {
                    renderBodyTable(wrapperTablebody, e?.units, ["_id", "__v", "lessons"], "courses/units", "lessons", "unitId");
                    deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
                }, condition);
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTablebody, data?.units, ["_id", "__v", "lessons"], "courses/units", "lessons", "unitId");
                deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
            })
            .catch((err) => {
                console.log(err);
            })
    })()
}