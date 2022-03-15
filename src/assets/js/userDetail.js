import { awaitLoader, getType, getToken } from "./common.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const origin = window.location.origin;

    // GET WRAPPER
    let userForm = $("#users-detail--info");
    let loader = $$(".modal-loader")[0];

    switch (getType()) {
        case "update":
            setTitleForm("update");
            userForm.addEventListener("submit", updateUser);
            break;

        case "create":
        default:
            setTitleForm("create");
            userForm.addEventListener("submit", createUser);
            break;
    }

    function createUser(e) {
        e.preventDefault();
        let data = getUserForm();
        if (data) {
            awaitLoader(loader, true);
            fetch(origin + "/API/user/new", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.status) {
                        awaitLoader(loader, false);
                        location.href = "/users";
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }

    }

    function updateUser(e) {
        e.preventDefault();
        let data = getUserForm();
        data["id"] = getToken();
        if (data) {
            awaitLoader(loader, true);
            fetch(origin + "/API/user/edit", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.status) {
                        awaitLoader(loader, false);
                        location.href = "/users";
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    function getUserForm() {
        let status = $("input[name='status']:checked");
        let userName = $("#user-name");
        let password = $("#password");
        let skills = $("#skills");
        let email = $("#email");
        let age = $("#age");

        let data = {
            "user_name": userName.value,
            "email": email.value,
            "password": password.value,
            "age": age.value,
            "status": status.value,
            "skills": skills.value || []
        }
        if ((!data["user_name"] || !data.email) ||
            (!data.password || !data.age) || !data.status) {
            return null;
        }
        return data;
    }

    function setTitleForm(type) {
        let title = $$(".users-detail--title")[0];
        let subButton = $$(".users-detail--btn")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới người dùng";
            subButton.innerHTML = "Thêm mới";
        } else {
            title.innerHTML = "Chỉnh sửa thông tin";
            subButton.innerHTML = "Cập nhật";
        }
    }

}