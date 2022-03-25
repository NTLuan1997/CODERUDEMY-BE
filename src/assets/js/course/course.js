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
    let titles = ["STT", "Tên khóa học", "Tác giả", "Loại khóa học", "Giá khóa học", "Ngày tạo", "Lần cập nhật cuối", "Chức năng"];

    (function () {
        httpsService(`API/course/home?limit=${pageRequire}&start=0`, "GET", null)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                renderHeaderTable(wrapperTableHeader, titles);
                renderPagination(wrapperPagination, 5, data.length, "API/course/home", (e) => {
                    renderBodyTable(wrapperTablebody, e?.courses, ["_id", "description", "thumbnail", "__v"], "courses", "units", "courseId");
                    deleteDocument($$(".btn-delete-document"), "API/course/remove");
                }, null);
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTablebody, data?.courses, ["_id", "description", "thumbnail", "__v"], "courses", "units", "courseId");
                deleteDocument($$(".btn-delete-document"), "API/course/remove");
            })
            .catch((err) => {
                console.log(err);
            })
    })()
}