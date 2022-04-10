import { getType, getToken, permission, mapperDate } from "../commons/common.js";
import { Validation } from "../commons/validation.js";
import { httpsService } from "../commons/httpService.js";

window.onload = function (e) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let userForm = $("#users-detail");
    let userName = $("#user-name");
    let password = $("#password");
    let skills = $("#skills");
    let email = $("#email");
    let dateOfBirth = $("#dateOfBirth");
    let role = $("#user-role");

    let toasts = $$(".modal-toasts")[0];

    Validation({
        form: "#users-detail",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#user-name",
                guides: [Validation.required()]
            },
            {
                selector: "#password",
                guides: [Validation.required(), Validation.minLength(6), Validation.maxLength(12)]
            },
            {
                selector: "#dateOfBirth",
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
                    console.log(data);
                    setUserForm(data);
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
        if (userForm.valid) {
            let data = getUserForm();
            if (data) {
                httpsService("API/user/user-new", "POST", data)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        data.status ?
                            location.href = "/users" :
                            permission(toasts, data);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    }

    function updateUser(e) {
        e.preventDefault();
        if (userForm.valid) {
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
                            permission(toasts, data);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        }
    }

    function getUserForm() {
        let data = {
            "user_name": userName.value,
            "email": email.value,
            "password": password.value,
            "dateOfBirth": new Date(dateOfBirth.value).toISOString(),
            "role": role.value,
            "status": ($("input[name='status']:checked").value) ? true : false,
            "courses": [],
        }
        return data;
    }

    function setUserForm(user) {
        userName.value = user["user_name"];
        email.value = user.email;
        password.value = user.password;
        dateOfBirth.value = mapperDate(new Date(user.dateOfBirth).toLocaleDateString());
        (user.status) ? $(`input[id='action']`).checked = true : $(`input[id='no-action']`).checked = true;
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

    $("#come-back").addEventListener("click", function (e) {
        window.history.back();
    })

}