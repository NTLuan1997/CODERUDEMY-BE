import { getType, getToken, toastsMessage } from "../commons/common.js";
import { Validation } from "../commons/validation.js";
import { httpsService } from "../commons/httpService.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let userForm = $("#users-detail--info");
    let status = $("input[name='status']:checked");
    let userName = $("#user-name");
    let password = $("#password");
    let skills = $("#skills");
    let email = $("#email");
    let age = $("#age");
    let role = $("#user-role");

    let modalToasts = $$(".modal-toasts")[0];
    let content = $$(".toasts-content")[0];

    Validation({
        form: "#users-detail--info",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#user-name",
                guides: [Validation.required()]
            },
            {
                selector: "#password",
                guides: [Validation.required(), Validation.minLength(6), Validation.maxLength(10)]
            },
            {
                selector: "#age",
                guides: [Validation.required(), Validation.dateOfBirth(0, 80)]
            },
            {
                selector: "#email",
                guides: [Validation.required(), Validation.isEmail()]
            },
            {
                selector: "#user-role",
                guides: [Validation.required()]
            }
        ]
    });

    if (getType() == "update") {
        (function () {
            httpsService("API/user/user-single", "POST", { id: getToken() })
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    setUserForm(data);
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }());
    }

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
            httpsService("API/user/user-new", "POST", data)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    data.status ?
                        location.href = "/users" :
                        toastsMessage(modalToasts, content, data);
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
            httpsService("API/user/user-edit", "PUT", data)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    data.status ?
                        location.href = "/users" :
                        toastsMessage(modalToasts, content, data);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    function getUserForm() {
        let data = {
            "user_name": userName.value,
            "email": email.value,
            "password": password.value,
            "age": age.value,
            "role": role.value,
            "status": $("input[name='status']:checked").value,
            "skills": skills.value || []
        }
        if ((!data["user_name"] || !data.email) ||
            (!data.password || !data.age) || !data.status) {
            return null;
        }
        return data;
    }

    function setUserForm(user) {
        userName.value = user["user_name"];
        email.value = user.email;
        password.value = user.password;
        age.value = user.age;
        (user.status == "action") ? $(`input[id='action']`).checked = true : $(`input[id='no-action']`).checked = true;
        skills.value = user.skills;
        for (let type of role) {
            if (type.value == user.role) {
                type.setAttribute("selected", true);
            }
        }
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