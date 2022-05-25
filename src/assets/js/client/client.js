import { environment } from "../config/environment.js";
import { HTTPS } from "../commons/httpService.js";
import { Cookie } from "../lib/cookie.js";
import { View } from "../lib/view.js";
// import { deleteDocument } from "../commons/delete.js";
// import { renderHeaderTable, renderBodyTable, renderPagination } from "../commons/render.js";

window.onload = function (e) {
    const https = new HTTPS();
    const cookie = new Cookie();
    const view = new View();
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);

    let token = `Bearer ${cookie.get("Authentic")}`;
    let pageRequire = 5;
    let Pagination = $$(".pagination")[0];
    let Header = $("#Header");
    let Body = $("#Body");
    let Title = ["STT", "Họ và tên", "Email", "Số điện thoại", "Địa chỉ", "Chức năng"];

    (function () {
        https.GET(token, environment.endpoint.client)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw err;
        })
        
        // httpsService(`API/client/manager-client`, "POST", {limit: `${pageRequire}`, start: 0})
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((res) => {
        //         renderHeaderTable(wrapperTableHeader, titles);

        //         console.log(res);
        //         renderPagination(wrapperPagination, 5, res.length, "API/client/manager-client", (e) => {
        //             renderBodyTable(wrapperTablebody, e?.clients, ["_id","Password", "Gender", "DateOfBirth", "Thumbnail", "RegisterCourse", "__v"], "clients", null, null);
        //             deleteDocument($$(".btn-delete-document"), "API/client/client");
        //         }, null);
        //         return res;

        //     })
        //     .then((res) => {
        //         renderBodyTable(wrapperTablebody, res?.clients, ["_id", "Password", "Gender", "DateOfBirth", "Thumbnail", "RegisterCourse", "__v"], "clients", null, null);
        //         deleteDocument($$(".btn-delete-document"), "API/client/client");

        //     })
        //     .catch((err) => {
        //         throw err;
        //     })
    })();
}