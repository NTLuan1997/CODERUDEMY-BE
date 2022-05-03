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
                renderPagination(wrapperPagination, 5, res.length, "API/client/client-register", (e) => {
                    renderBodyTable(wrapperTablebody, e?.clients, ["_id","Password", "Gender", "DateOfBirth", "Thumbnail", "registerCourse", "__v"], "clients", null, null);
                    deleteDocument($$(".btn-delete-document"), "API/client/client");
                }, null);
                return res;

            })
            .then((res) => {
                renderBodyTable(wrapperTablebody, res?.clients, ["_id", "Password", "Gender", "DateOfBirth", "Thumbnail", "registerCourse", "__v"], "clients", null, null);
                deleteDocument($$(".btn-delete-document"), "API/client/client");

            })
            .catch((err) => {
                throw err;
            })
    })();

    let formData = new FormData();
    let thumbnail = document.getElementById("thumbnail");
    $("#test").addEventListener("submit", function(e) {
        e.preventDefault();
        console.log(thumbnail.files[0]);
        
        formData.append("thumbnail", thumbnail.files[0]);

        fetch("http://localhost/www/CODERUDEMY-IMG/index.php", {
            "method": "POST",
            // "headers": {
            //     "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundaryuFYJB4ncxH2qfDOp",
            //     "Content-Disposition": "form-data; name='myFile'; filename='foo.txt'",
            // },
            "body": formData
        })
        // .catch((data) => {
        //     console.log(data);

        // })
        .catch((err) => {
            throw err;
        })
    })
}