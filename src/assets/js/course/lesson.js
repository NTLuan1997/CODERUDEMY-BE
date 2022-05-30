// import { httpsService } from "../commons/httpService.js";
// import { deleteDocument } from "../commons/delete.js";
// import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

// window.onload = function (e) {
//     const $ = document.querySelector.bind(document);
//     const $$ = document.querySelectorAll.bind(document);

//     let pageRequire = 5;
//     let routerLessonNew = $("#lesson-new");
//     let wrapperPagination = $$(".pagination")[0];
//     let wrapperTableHeader = $("#lesson-table-header");
//     let wrapperTablebody = $("#lesson-table-body");
//     let titles = ["STT", "Mã Chương học", "Tên bài học", "Trang thái", "Ngày tạo", "Lần cập nhật cuối", "Chức năng"];

//     let unitId = location.search.split("=")[1];
//     let condition = [`unitId=${unitId}`];

//     let id = localStorage.getItem("courseId") ? JSON.parse(localStorage.getItem("courseId")) : 0;
//     $("#go-back").setAttribute("href", `/courses/units?courseId=${id}`);
//     routerLessonNew.setAttribute("href", location.href.replace("?", "/detail?type=create&"));

//     (function () {

//         httpsService(`API/lesson/lesson?limit=${pageRequire}&start=0&unitId=${unitId}`, "GET", null)
//             .then((data) => {
//                 return data.json();
//             })
//             .then((data) => {
//                 renderHeaderTable(wrapperTableHeader, titles);
//                 renderPagination(wrapperPagination, 5, data.length, "API/lesson/lesson", (e) => {
//                     renderBodyTable(wrapperTablebody, e?.lessons, ["_id", "lessonContent", "thumbnail", "__v"], "courses/units/lessons", "lessons");
//                     deleteDocument($$(".btn-delete-document"), "API/lesson/lesson-remove");
//                 }, condition);
//                 return data;
//             })
//             .then((data) => {
//                 renderBodyTable(wrapperTablebody, data?.lessons, ["_id", "lessonContent", "thumbnail", "__v"], "courses/units/lessons", "lessons");
//                 deleteDocument($$(".btn-delete-document"), "API/lesson/lesson-remove");
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     })()

// }