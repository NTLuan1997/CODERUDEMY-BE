window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    let itemInPage = 2;   // Số phần tử trên page theo yêu cầu khách hàng
    let totalPage = null; // Số item pagination được tính ra
    let origin = window.location.origin;
    let headerTitles = ["STT", "Tài khoản", "Email", "Password", "Trạng thái", "Tuổi", "Quyền"];

    (function () {

        fetch(`${origin}/API/user/home?limit=${itemInPage}&start=0`, { method: "GET" })
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
        let template = data.reduce((accument, current, currentIndex) => {
            return accument.concat(`
                <tr>
                    <td>${currentIndex + 1}</td>
                    <td>${current['user_name']}</td>
                    <td>${current['email']}</td>
                    <td>${current['password']}</td>
                    <td>${current['status']}</td>
                    <td>${current['age']}</td>
                    <td>
                        <button type="button" class="btn btn-primary">
                            <a href="/users/detail?type=update&id=${current['_id']}">Sửa</a>
                        </button>
                        <button type="button" class="btn btn-danger btn-delete-user" data-toggle="modal"
                            data-whatever="${current['_id']}" data-id="${current['_id']}" data-target="#deleteUser">Xóa</button>
                    </td>
                </tr>
            `)
        }, []).join("");
        body.innerHTML = template;
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
                fetch(`${origin}/API/user/home?limit=${itemInPage}&start=${start}`, { method: "GET" })
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