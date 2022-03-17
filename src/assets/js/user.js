import { deleteUser } from "./delete.js";
import { httpsService } from "./httpService.js";
import { renderCommonBody } from "./render.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let itemInPage = 5;   // Số phần tử trên page theo yêu cầu khách hàng
    let totalPage = null; // Số item pagination được tính ra
    let headerTitles = ["STT", "Tài khoản", "Email", "Password", "Trạng thái", "Tuổi", "Quyền"];

    (function () {
        httpsService(`API/user/home?limit=${itemInPage}&start=0`, "GET", null)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                renderTableTitle();
                renderTabPagination(data.length);
                return data?.users;
            })
            .then((data) => {
                renderTableBody(data);
                paginationEvent();
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

    function renderTableBody(data) {
        let body = $("#user-table-body");
        body.innerHTML = renderCommonBody(data, ["_id", "skills"]);
        deleteUser($$(".btn-delete-user"));
    }

    function renderTabPagination(totalItem) {
        let wrapper = $$(".pagination")[0];
        totalPage = Math.ceil(totalItem / itemInPage);

        let template = '';
        for (let i = 0; i < totalPage; i++) {
            template += `<li class="page-items" data-id="${(i + 1)}"><a class="page-link">${(i + 1)}</a></li>`;
        }
        wrapper.innerHTML = template;
    }

    function paginationEvent() {
        let items = $$(".page-items");
        items.forEach((e) => {
            e.addEventListener("click", function (e) {
                let start = itemInPage * (this.dataset.id - 1);
                httpsService(`API/user/home?limit=${itemInPage}&start=${start}`, "GET", null)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        renderTableBody(data.users);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        })
    }

}