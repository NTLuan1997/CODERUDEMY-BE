import { getType, getToken, permission, convertDate } from "../commons/common.js";
import { Validation } from "../commons/validation.js";
import { httpsService } from "../commons/httpService.js";

window.onload = function (e) {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // GET WRAPPER
    let Client = $('#Client');
    let Code = $("#Code");
    let Name = $("#Name");
    let Email = $("#Email");
    let Password = $("#Password");
    let Thumbnail = $("#Thumbnail");
    let Gender = $("#Gender");
    let DateOfBirth = $("#DateOfBirth");
    let Phone = $("#Phone");
    let Address = $("#Address");

    let toasts = $$(".modal-toasts")[0];


    Validation({
        form: "#Client",
        selectorError: ".form-message",
        rules: [
            {
                selector: "#Name",
                guides: [Validation.required()]
            },
            {
                selector: "#Email",
                guides: [Validation.required(), Validation.isEmail()]
            },
            {
                selector: "#Gender",
                guides: [Validation.required()]
            },
            {
                selector: "#DateOfBirth",
                guides: [Validation.required()]
            },
            {
                selector: "#Phone",
                guides: [Validation.required()]
            },
            {
                selector: "#Address",
                guides: [Validation.required()]
            }
        ]
    });


    if (getType() == "update") {
        (function () {
            httpsService(`API/client/client/${getToken()}`, "GET", null)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    setCourseForm(data);
                })
                .catch((err) => {
                    throw err;
                })
        }());
    }

    switch (getType()) {
        case "update":
            setTitleForm("update");
            Client.addEventListener("submit", update);
            break;

        case "create":
        default:
            setTitleForm("create");
            Client.addEventListener("submit", save);
            break;
    }

    function save(e) {
        e.preventDefault();
        if (this.valid) {
            let client = getCourseForm();
            client.Type = 'Create';
            if (client) {
                httpsService("API/client/client", "POST", client)
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        res.status ?
                            location.href = "/clients" :
                            permission(toasts, res);
                    })
                    .catch((err) => {
                        throw err;
                    })
            }
        }
    }

    function update(e) {
        e.preventDefault();
        if (this.valid) {
            let client = getCourseForm();
            client.Type = 'Update';

            if (client) {
                httpsService("API/client/client", "PUT", client)
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        res.status ?
                            location.href = "/clients" :
                            permission(toasts, res);
                    })
                    .catch((err) => {
                        throw err;
                    })
            }
        }
    }

    function getCourseForm() {
        let data = {
            Code: Code.value,
            Name: Name.value,
            Email: Email.value,
            Password: (Password.value)? Password.value : 'P@ssword12345',
            Gender: Gender.value,
            DateOfBirth: DateOfBirth.value,
            Phone: Phone.value,
            Address: Address.value,
            Thumbnail: (Thumbnail.value)? Thumbnail.value : "thumbnail_default.jpg",
            registerCourse: []
        }
        return data;
    }

    function setCourseForm(client) {
        let dateOfBirth = new Date(client.DateOfBirth.split(".")[0]);
        Code.value = client._id;
        Name.value = client.Name;
        Email.value = client.Email;
        Password.value = client.Password;
        DateOfBirth.value = convertDate(dateOfBirth);
        Phone.value = client.Phone;
        Address.value = client.Address;
        Thumbnail.value = client.Thumbnail;
        for (let gender of Gender) {
            if (gender.value == client.Gender) {
                gender.setAttribute("selected", true);
            }
        }
    }

    function setTitleForm(type) {
        let title = $$(".page-detail--title")[0];
        let subButton = $$(".btn-executed")[0];

        if (type == "create") {
            title.innerHTML = "Thêm mới học viên";
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