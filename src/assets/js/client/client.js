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
    let titles = ["STT", "Tên khóa học", "Tác giả", "Loại khóa học", "Số bài giảng", "Ngày tạo", "Lần cập nhật cuối", "Chức năng"];

    (function () {
        httpsService(`API/client/manager-client`, "POST", {limit: `${pageRequire}`, start: 0})
            .then((res) => {
                let undefineData = document.querySelectorAll(".undefine-data")[0];
                undefineData.classList.add("active");
                return res.json();
            })
            .then((res) => {
                console.log(res);
                if(!res?.status) {
                    return res;

                } else {
                    renderHeaderTable(wrapperTableHeader, titles);
                    renderPagination(wrapperPagination, 5, res.length, "API/client/client-register", (e) => {
                        renderBodyTable(wrapperTablebody, e?.clients, ["_id", "description", "thumbnail", "__v"], "courses", "units", "courseId");
                        deleteDocument($$(".btn-delete-document"), "API/course/course-remove");
                    }, null);
                    return res;
                }
            })
            .then((res) => {
                if(!res?.status) {

                } else {
                    renderBodyTable(wrapperTablebody, data?.clients, ["_id", "description", "thumbnail", "__v"], "courses", "units", "courseId");
                    deleteDocument($$(".btn-delete-document"), "API/course/course-remove");
                }
            })
            .catch((err) => {
                throw err;
            })
    })()
}