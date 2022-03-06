window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    let url = location.href;
    let headerTitles = ["STT", "Tài khoản", "Email", "Password", "Trạng thái", "Tuổi", "Quyền"];
    let pagination_items = $$(".pagination .page-items");

    // let user_id = 0;
    // let btn_delete = $$(".btn-delete-user");
    // let modal_delete = $("#delete-user");

    // for (let i = 0; i < btn_delete.length; i++) {
    //     btn_delete[i].addEventListener("click", function (e) {
    //         user_id = this.dataset.whatever;
    //     });
    // }

    // modal_delete.addEventListener("click", function (e) {
    //     fetch(location.href, {
    //         method: "DELETE",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ "id": user_id })
    //     })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             if (data) {
    //                 location.reload();
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // })

    (function () {
        fetch(`${url}/home?limit=2&start=0`, { method: "GET" })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                renderTableTitle();
                return data;
            })
            .then((data) => {
                renderTableBody(data);
            })
            .catch((err) => {
                console.log(err);
            })

    })();

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



    pagination_items.forEach(function (item) {
        item.addEventListener("click", function () {
            let url = `${location.href}//home?limit=2&start=2`;
            fetch(url, { method: "GET" })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    renderTableBody(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    })

}