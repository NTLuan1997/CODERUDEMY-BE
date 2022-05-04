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

    // let thumbnail = document.getElementById("thumbnail");
    // $("#test").addEventListener("submit", function(e) {
    //     e.preventDefault();
        
    //     let Form = new FormData();
    //     Form.append("thumbnail", thumbnail.files[0]);
    //     Form.append("Type", "Client");

    //     fetch("http://localhost/www/CODERUDEMY-IMG/index.php", {
    //         "method": "POST",
    //         "body": Form
    //     })
    //     .then((data) => {
    //         return data.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((err) => {
    //         throw err;
    //     })
    // })

    // $("#unlink").addEventListener("click", function(e) {
    //     e.preventDefault();
    //     let Form = new FormData();
    //     Form.append("thumbnail", "6271f30c464829.99098916.jpg");
    //     Form.append("Type", "unlink");

    //     fetch("http://localhost/www/CODERUDEMY-IMG/index.php", {
    //         "method": "POST",
    //         "body": Form
    //     })
    //     .then((data) => {
    //         return data.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((err) => {
    //         throw err;
    //     })

    // })
}