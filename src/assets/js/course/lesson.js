import { httpsService } from "../commons/httpService.js";
import { deleteDocument } from "../commons/delete.js";
import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    $("#come-back").addEventListener("click", function (e) {
        window.history.back();
    })

    let pageRequire = 5;
    let routerLessonNew = $("#lesson-new");
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTableHeader = $("#lesson-table-header");
    let wrapperTablebody = $("#lesson-table-body");
    let titles = ["STT", "Mã Chương học", "Tên bài học", "Trang thái", "Ngày tạo", "Lần cập nhật cuối", "Chức năng"];

    let unitId = location.search.split("=")[1];
    let condition = [`unitId=${unitId}`];

    routerLessonNew.setAttribute("href", location.href.replace("?", "/detail?type=create&"));

    (function () {

        console.log(unitId);

        httpsService(`API/lesson/lesson-home?limit=${pageRequire}&start=0&unitId=${unitId}`, "GET", null)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                renderHeaderTable(wrapperTableHeader, titles);
                renderPagination(wrapperPagination, 5, data.length, "API/lesson/lesson-home", (e) => {
                    renderBodyTable(wrapperTablebody, e?.lessons, ["_id", "lessonContent", "thumbnail", "__v"], "courses/units", "lessons");
                    deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
                }, condition);
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTablebody, data?.lessons, ["_id", "lessonContent", "thumbnail", "__v"], "courses/units", "lessons");
                deleteDocument($$(".btn-delete-document"), "API/unit/unit-remove");
            })
            .catch((err) => {
                console.log(err);
            })
    })()

}