window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let user_id = 0;
    let btn_delete = $$(".btn-delete-user");
    let modal_delete = $("#delete-user");

    for (let i = 0; i < btn_delete.length; i++) {
        btn_delete[i].addEventListener("click", function (e) {
            user_id = this.dataset.whatever;
        });
    }

    modal_delete.addEventListener("click", function (e) {
        fetch(location.href, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": user_id })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data) {
                    location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })
}