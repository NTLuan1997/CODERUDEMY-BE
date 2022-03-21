import { httpsService } from "../commons/httpService.js";
import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let pageRequire = 5;
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTableHeader = $("#course-table-header");
    let wrapperTablebody = $("#course-table-body");
    let titles = ["STT", "Tên khóa học", "Tác giả", "Loại khóa học", "Giá khóa học", "Ngày tạo", "Lần cập nhật cuối", "Quyền"];

    (function () {
        httpsService(`API/course/home?limit=${pageRequire}&start=0`, "GET", null)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                renderHeaderTable(wrapperTableHeader, titles);
                renderPagination(wrapperPagination, 5, data.length, "API/user/home", (e) => {
                    renderBodyTable(wrapperTablebody, e?.courses, ["_id", "description", "thumbnail", "__v"], "courses");
                });
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTablebody, data?.courses, ["_id", "description", "thumbnail", "__v"], "courses");
            })
            .catch((err) => {
                console.log(err);
            })
    })()
}