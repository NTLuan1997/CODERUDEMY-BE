import { deleteUser } from "./delete.js";
import { httpsService } from "./httpService.js";
import { renderBodyTable, renderPagination } from "./render.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let pageRequire = 5;
    let wrapperPagination = $$(".pagination")[0];
    let wrapperTemplate = $("#user-table-body");
    let headerTitles = ["STT", "Tên người dùng", "Email", "Password", "Trạng thái", "Tuổi", "Quyền"];

    (function () {
        httpsService(`API/user/home?limit=${pageRequire}&start=0`, "GET", null)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                renderTableTitle();
                renderPagination(wrapperPagination, 5, data.length, "API/user/home", (e) => {
                    renderBodyTable(wrapperTemplate, e?.users, ["_id", "skills", "__v"], "users");
                    deleteUser($$(".btn-delete-user"));
                });
                return data;
            })
            .then((data) => {
                renderBodyTable(wrapperTemplate, data?.users, ["_id", "skills", "__v"], "users");
                deleteUser($$(".btn-delete-user"));
            })
            .catch((err) => {
                console.log(err);
            })
    })();

    // [RENDER TEMPLATE]
    function renderTableTitle() {
        let header = $("#user-table-header");
        let template = headerTitles.reduce((accument, current) => {
            return accument.concat(`<th>${current}</th>`);
        }, []).join("");
        header.innerHTML = template;
    }

}